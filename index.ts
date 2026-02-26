import chalk from "chalk";
import ora from "ora";

type Fact = {
    fact: string;
    length: number;
}

export async function getFact(): Promise<string> {
    const spinner = ora("Patience is a virtue...");
    const response = await fetch("https://catfact.ninja/fact");

    if (!response.ok) {
        spinner.fail(
            'Unable to fetch - ${response.status}: ${response.statusText}',
        );
        process.exit(1);
    }

    const result = (await response.json()) as Fact;


    spinner.succeed("Retrieved info about a feline!");
    return result.fact;
}

const catArt = `
 /\\_/\\
( o.o )
 > ^ <
`

//You can add ASCII art by going to a website
const fact = await getFact();
console.log("\n\n", chalk.bgBlack(chalk.greenBright(fact)), "\n", catArt);