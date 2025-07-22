/**
 * 두 값의 얕은 비교를 수행합니다. (1단계 깊이만 비교)
 *
 * @param objA - 비교할 첫 번째 값 (모든 타입 허용)
 * @param objB - 비교할 두 번째 값 (모든 타입 허용)
 * @returns 두 값이 얕은 수준에서 동일하면 true, 다르면 false
 */
export function shallowEquals(objA: unknown, objB: unknown): boolean {
  // 1단계: 참조 동일성 체크
  if (objA === objB) return true;

  // 2단계: 타입 체크
  const typeA = typeof objA;
  const typeB = typeof objB;

  if (typeA !== typeB) return false;
  if (objA === null || objB === null) return false; // null 체크
  if (typeA !== "object") return false; // 원시 타입은 종료

  // 3단계: 객체로 타입 단언
  const recordA = objA as Record<string, unknown>;
  const recordB = objB as Record<string, unknown>;

  // 4단계: 키 개수 비교
  const keysA = Object.keys(recordA);
  if (keysA.length !== Object.keys(recordB).length) return false;

  // 5단계: 키별 얕은 비교
  for (const key of keysA) {
    if (!(key in recordB)) return false; // 키가 없으면 종료
    if (recordA[key] !== recordB[key]) return false; // 값이 다르면 종료
  }

  return true;
}
