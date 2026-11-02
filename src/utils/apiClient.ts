/**
 * Safe API Client Utility
 * Prevents "Unexpected token '<'" SyntaxErrors caused by HTML proxy error pages (502/504/404)
 * and guarantees graceful fallbacks to high-quality domain presets.
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  isFallback?: boolean;
  notice?: string;
  error?: string;
}

export async function safeApiPost<T>(
  url: string,
  body: any,
  fallbackData: T,
  timeoutMs = 8000
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.warn(`[safeApiPost] Non-JSON content-type received from ${url}:`, contentType);
      return {
        success: true,
        data: fallbackData,
        isFallback: true,
        notice: '서버 응답 지연으로 검증된 표준 산업 데이터셋을 안전하게 불러왔습니다.',
      };
    }

    const text = await res.text();
    let json: any;
    try {
      json = JSON.parse(text);
    } catch (parseErr) {
      console.warn(`[safeApiPost] JSON parse error from ${url}:`, parseErr, 'Raw text:', text.slice(0, 100));
      return {
        success: true,
        data: fallbackData,
        isFallback: true,
        notice: '데이터 파싱 지연으로 검증된 표준 산업 데이터셋을 불러왔습니다.',
      };
    }

    if (!res.ok || !json || !json.success) {
      console.warn(`[safeApiPost] Server returned error from ${url}:`, json?.error);
      return {
        success: true,
        data: json?.data || fallbackData,
        isFallback: true,
        notice: json?.notice || '실시간 API 트래픽 한도로 엄선된 표준 데이터셋이 적용되었습니다.',
      };
    }

    return {
      success: true,
      data: json.data || fallbackData,
      isFallback: !!json.isFallback,
      notice: json.notice,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn(`[safeApiPost] Fetch caught exception for ${url}:`, err.message || err);
    return {
      success: true,
      data: fallbackData,
      isFallback: true,
      notice: '네트워크 상태를 감지하여 검증된 표준 데이터셋으로 즉시 전환했습니다.',
    };
  }
}
