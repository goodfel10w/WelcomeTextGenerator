export const introductionVariants = {
    variant1: (name, position, team) => `Welcome to ${name}! Mit einem frischen Blick und einer ordentlichen Portion Erfahrung tritt ${name} als ${position} in unser Team im Bereich ${team} ein.`,
    variant2: (name, position, team) => `Wir freuen uns riesig, ${name} bei uns begrüßen zu dürfen! Ab sofort verstärkt er/sie unser Team im Bereich ${team} als ${position} und bringt dabei wertvolle Erfahrung und neue Impulse mit.`,
    variant3: (name, position, team) => `Ein herzliches Willkommen an ${name}! Mit viel Know-how und Tatendrang startet er/sie als ${position} in unserem ${team}-Team durch und wird uns mit seiner/ihrer Expertise bereichern.`,
};
export const competenciesTemplate = (name, skills, passion) => {
    const firstName = name.split(" ")[0];
    const skillsList = skills.slice(0, 2).join(" und ");
    return `${firstName} bringt nicht nur umfangreiche Kenntnisse in ${skillsList} mit, sondern auch jede Menge Energie und Leidenschaft für ${passion}.`;
};
export const funFactTemplate = (name, funFact, teamReference) => {
    const firstName = name.split(" ")[0];
    let text = `Fun Fact über ${firstName}: Wusstest du, dass er/sie ${funFact}?`;
    if (teamReference) {
        text += ` ${teamReference}`;
    }
    return text;
};
export const experienceTemplate = (name, previousPosition, previousCompany, responsibilities, additionalAchievements) => {
    const firstName = name.split(" ")[0];
    let text = `Zuletzt hat ${firstName} als ${previousPosition} bei ${previousCompany} gearbeitet. Dort hat er/sie ${responsibilities.join(" und ")}.`;
    if (additionalAchievements) {
        text += ` Außerdem ${additionalAchievements}.`;
    }
    return text;
};
export const closingVariants = {
    variant1: (name) => `Herzlich willkommen im Team, ${name}! Lass uns gemeinsam großartige Dinge erreichen. Schön, dass du da bist!`,
    variant2: (name) => `Wir freuen uns sehr, dich an Bord zu haben, ${name}! Auf eine tolle Zusammenarbeit und viele erfolgreiche Projekte. Willkommen in der Familie!`,
    variant3: (name) => `Schön, dass du jetzt Teil unseres Teams bist, ${name}! Wir sind gespannt auf die gemeinsame Zeit und freuen uns auf alles, was wir zusammen bewegen werden. Herzlich willkommen!`,
};
