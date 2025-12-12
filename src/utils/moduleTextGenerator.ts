import { ExtractedData } from "../types.js";
import {
    introductionVariants,
    competenciesTemplate,
    funFactTemplate,
    experienceTemplate,
    closingVariants,
    IntroductionVariant,
    ClosingVariant,
} from "../templates/moduleTemplates.js";

export interface ModuleOptions {
    includeCompetencies?: boolean;
    includeFunFact?: boolean;
    includeExperience?: boolean;
    introductionVariant?: IntroductionVariant;
    closingVariant?: ClosingVariant;
}

/**
 * Generiert einen modularen Willkommenstext basierend auf dem Template-System
 */
export function generateModularWelcomeText(
    data: ExtractedData,
    options: ModuleOptions = {}
): string {
    const {
        includeCompetencies = true,
        includeFunFact = false,
        includeExperience = true,
        introductionVariant = "variant1",
        closingVariant = "variant1",
    } = options;

    const modules: string[] = [];

    // Modul 1: Begrüßung & Einleitung (Pflicht)
    const introduction = introductionVariants[introductionVariant](
        data.name,
        data.position || "Mitarbeiter",
        "unserem Team" // Kann später aus data.team kommen
    );
    modules.push(introduction);

    // Modul 2: Kompetenzen & Stärken (Optional)
    if (includeCompetencies && data.skills.length > 0) {
        const passion = data.interests[0] || data.skills[0] || "Innovation";
        const competencies = competenciesTemplate(data.name, data.skills, passion);
        modules.push(competencies);
    }

    // Modul 3: Fun Fact (Optional)
    if (includeFunFact && data.interests.length > 0) {
        const funFact = funFactTemplate(
            data.name,
            data.interests[0],
            "Vielleicht erleben wir das bald gemeinsam im Team!"
        );
        modules.push(funFact);
    }

    // Modul 4: Beruflicher Werdegang (Optional)
    if (includeExperience && data.previousCompany && data.experience) {
        const responsibilities = data.achievements.slice(0, 2);
        const additionalInfo = data.achievements[2];

        const experience = experienceTemplate(
            data.name,
            data.position || "Spezialist",
            data.previousCompany,
            responsibilities.length > 0 ? responsibilities : ["wichtige Projekte verantwortet"],
            additionalInfo
        );
        modules.push(experience);
    }

    // Modul 5: Abschluss & Willkommensgruß (Pflicht)
    const closing = closingVariants[closingVariant](data.name);
    modules.push(closing);

    // Alle Module mit Leerzeilen verbinden
    return modules.join("\n\n");
}
