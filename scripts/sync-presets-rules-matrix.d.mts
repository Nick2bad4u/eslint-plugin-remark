export function extractPresetsMatrixSection(markdown: string): string;
export function generatePresetsRulesMatrixSectionFromRules(): string;
export function syncPresetsRulesMatrix(options?: {
    writeChanges?: boolean;
}): Promise<{ changed: boolean }>;
