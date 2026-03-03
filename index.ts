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

function addRandomEmoji(fact: string): string {
    const emojis = ["🐱", "🙀", "😸", "😼", "😎", "😭", "🔥", "💀", "👍", "👀", "🆒"];

    const selected: string[] = [];
    
    while (selected.length < 3) {
        const randomEmoji =
        emojis[Math.floor(Math.random() * emojis.length)]!;

        if (!selected.includes(randomEmoji)) {
            selected.push(randomEmoji);
        }
    }

    return `${fact} ${selected.join(" ")}`;
}

const fact = await getFact();
const enhancedFact = addRandomEmoji(fact);
console.log("\n\n", chalk.bgBlack(chalk.greenBright(enhancedFact)), "\n", catArt);