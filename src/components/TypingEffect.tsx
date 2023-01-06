import { useEffect, useState } from "react";

type Props = {
  textList: string[];
  options?: {
    typeSpeed?: number;
    wordIntervalSpeed?: number;
    infinite?: boolean;
  };
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TypingEffect = ({ textList, options }: Props) => {
  const [currentText, setCurrentText] = useState("");

  const typeSpeed = options?.typeSpeed || 100;
  const wordIntervalSpeed = options?.wordIntervalSpeed || 1000;

  const type = async () => {
    while (true) {
      for (let text of textList) {
        // type
        for (let letter of text) {
          setCurrentText((prev) => prev + letter);

          await sleep(typeSpeed);
        }

        await sleep(wordIntervalSpeed);

        // delete
        for (let i = text.length; i > 0; i--) {
          setCurrentText((prev) => prev.slice(0, -1));

          await sleep(typeSpeed);
        }
      }
    }
  };

  useEffect(() => {
    type();
  }, []);

  return <span>{currentText}</span>;
};
