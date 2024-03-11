import { useEffect } from "react";

export function useEffectLastKey(arrayOfEdit: string[],
    lastKey: string | null,
    keys: string[],
    editTextEditPanel: (type: string) => void,
    checkingCombinations: (keys: string[], button: string, keysChecking: string) => Boolean): void {

    return useEffect(() => {
        if (!lastKey) return;

        if (arrayOfEdit.includes(lastKey?.toLowerCase())) {
          console.log(1);
          for (let i: number = 0; i < arrayOfEdit.length - 1; i++) {
            console.log(keys, arrayOfEdit[i]);
            if (checkingCombinations(keys, "alt", arrayOfEdit[i])) {
              console.log(3, i);
              editTextEditPanel(arrayOfEdit[i]);
              break;
            }
          }
        }
      }, [lastKey]);
}