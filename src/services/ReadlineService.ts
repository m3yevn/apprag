import readline from "readline";

export const readLine = (question: string, answerCallback: Function) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(question, (answer: any) => {
    answerCallback(answer);
    rl.close();
  });
};
