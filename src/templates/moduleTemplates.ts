export interface WelcomeTextModules {
    introduction: string;
    competencies: string;
    funFact?: string;
    experience: string;
    closing: string;
}

export const introductionVariants = {
    variant1: (name: string, position: string, team: string) =>
        `Welcome to ${name}! Mit einem frischen Blick und einer ordentlichen Portion Erfahrung tritt ${name} als ${position} in unser Team im Bereich ${team} ein.`,

    variant2: (name: string, position: string, team: string) =>
        `Wir freuen uns riesig, ${name} bei uns begrüßen zu dürfen! Ab sofort verstärkt er/sie unser Team im Bereich ${team} als ${position} und bringt dabei wertvolle Erfahrung und neue Impulse mit.`,

    variant3: (name: string, position: string, team: string) =>
        `Ein herzliches Willkommen an ${name}! Mit viel Know-how und Tatendrang startet er/sie als ${position} in unserem ${team}-Team durch und wird uns mit seiner/ihrer Expertise bereichern.`,
};

export const competenciesTemplate = (name: string, skills: string[], passion: string) => {
    const firstName = name.split(" ")[0];
    const skillsList = skills.slice(0, 2).join(" und ");
    return `${firstName} bringt nicht nur umfangreiche Kenntnisse in ${skillsList} mit, sondern auch jede Menge Energie und Leidenschaft für ${passion}.`;
};

export const funFactTemplate = (name: string, funFact: string, teamReference?: string) => {
    const firstName = name.split(" ")[0];
    let text = `Fun Fact über ${firstName}: Wusstest du, dass er/sie ${funFact}?`;
    if (teamReference) {
        text += ` ${teamReference}`;
    }
    return text;
};

export const experienceTemplate = (
    name: string,
    previousPosition: string,
    previousCompany: string,
    responsibilities: string[],
    additionalAchievements?: string
) => {
    const firstName = name.split(" ")[0];
    let text = `Zuletzt hat ${firstName} als ${previousPosition} bei ${previousCompany} gearbeitet. Dort hat er/sie ${responsibilities.join(" und ")}.`;

    if (additionalAchievements) {
        text += ` Außerdem ${additionalAchievements}.`;
    }

    return text;
};

export const closingVariants = {
    variant1: (name: string) =>
        `Herzlich willkommen im Team, ${name}! Lass uns gemeinsam großartige Dinge erreichen. Schön, dass du da bist!`,

    variant2: (name: string) =>
        `Wir freuen uns sehr, dich an Bord zu haben, ${name}! Auf eine tolle Zusammenarbeit und viele erfolgreiche Projekte. Willkommen in der Familie!`,

    variant3: (name: string) =>
        `Schön, dass du jetzt Teil unseres Teams bist, ${name}! Wir sind gespannt auf die gemeinsame Zeit und freuen uns auf alles, was wir zusammen bewegen werden. Herzlich willkommen!`,
};

export type IntroductionVariant = "variant1" | "variant2" | "variant3";
export type ClosingVariant = "variant1" | "variant2" | "variant3";
