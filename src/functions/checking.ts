export function checkingCombinations(
    keys: string[],
    key1: string,
    key2: string
  ): Boolean {
    console.log(
      keys.includes(key1.toLowerCase()) && keys.includes(key2.toLowerCase())
    );
    return (
      keys.includes(key1.toLowerCase()) && keys.includes(key2.toLowerCase())
    );
}