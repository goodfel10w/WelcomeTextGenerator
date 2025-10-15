import { z } from "zod";
import { generateModularWelcomeText } from "../utils/moduleTextGenerator.js";

export const generateModularTextTool = {
    name: "generate_modular_welcome_text",
    config: {
        title: "Modularen Willkommenstext generieren",
        description: "Generiert einen strukturierten Willkommenstext nach dem Modul-Template-System",
        inputSchema: {
            data: z.object({
                name: z.string(),
                position: z.string().optional(),
                previousCompany: z.string().optional(),
                skills: z.array(z.string()),
                experience: z.string().optional(),
                education: z.string().optional(),
                achievements: z.array(z.string()),
                interests: z.array(z.string()),
            }),
            moduleOptions: z.object({
                includeCompetencies: z.boolean().default(true).describe("Modul 2: Kompetenzen & Stärken einbinden"),
                includeFunFact: z.boolean().default(false).describe("Modul 3: Fun Fact einbinden"),
                includeExperience: z.boolean().default(true).describe("Modul 4: Beruflicher Werdegang einbinden"),
                introductionVariant: z.enum(["variant1", "variant2", "variant3"]).default("variant1").describe("Variante für Modul 1: Begrüßung"),
                closingVariant: z.enum(["variant1", "variant2", "variant3"]).default("variant1").describe("Variante für Modul 5: Abschluss"),
            }).default({}),
        },
    },
    handler: async ({ data, moduleOptions }: {
        data: any;
        moduleOptions: any;
    }) => {
        const text = generateModularWelcomeText(data, moduleOptions);
        return {
            content: [
                {
                    type: "text" as const,
                    text: text,
                },
            ],
        };
    },
};
