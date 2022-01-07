export function fetchCards(params: string) {
  return {
    id: params,
    done: false,
    text: params,
  };
}
