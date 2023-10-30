import type { StatusRegistry } from './StatusRegistry';
import { StatusSettings } from './Config/StatusSettings';
import { MarkdownTable } from './lib/MarkdownTable';
import type { StatusConfiguration } from './StatusConfiguration';

export function tabulateStatusSettings(statusSettings: StatusSettings) {
    // Note: There is very similar code in verifyStatusesAsMarkdownTable() in DocsSamplesForStatuses.test.ts.
    //       Maybe try unifying the common code one day?

    const table = new MarkdownTable(['Status Symbol', 'Next Status Symbol', 'Status Name', 'Status Type']);

    const statuses: StatusConfiguration[] = StatusSettings.allStatuses(statusSettings);
    for (const status of statuses) {
        table.addRow([
            getPrintableSymbol(status.symbol),
            getPrintableSymbol(status.nextStatusSymbol),
            status.name,
            getPrintableSymbol(status.type),
        ]);
    }
    return table.markdown;
}

export function createStatusRegistryReport(
    statusSettings: StatusSettings,
    statusRegistry: StatusRegistry,
    buttonName: string,
    versionString: string,
) {
    // Ideas for further improvement
    // - Actually make it an informative report, that shows any issues in settings with duplicate symbols.
    // - Show any 'next status symbols' that are not known to the plugin.
    // - Show any status transitions that won't work with recurring tasks currently, as DONE not followed by TODO.

    const detailed = true;
    const settingsTable = tabulateStatusSettings(statusSettings);
    const mermaidText = statusRegistry.mermaidDiagram(detailed);
    return `# ${buttonName}

## About this file

This file was created by the Obsidian Tasks plugin (version ${versionString}) to help visualise the task statuses in this vault.

If you change the Tasks status settings, you can get an updated report by:

- Going to \`Settings\` -> \`Tasks\`.
- Clicking on \`Review and check your Statuses\`.

You can delete this file any time.

## Status Settings

<!--
Switch to Live Preview or Reading Mode to see the table.
If there are any Markdown formatting characters in status names, such as '*' or '_',
Obsidian may only render the table correctly in Reading Mode.
-->

These are the status values in the Core and Custom statuses sections.

${settingsTable}
## Loaded Settings

<!-- Switch to Live Preview or Reading Mode to see the diagram. -->

These are the settings actually used by Tasks.
${mermaidText}`;
}

export function getPrintableSymbol(symbol: string) {
    const result = symbol !== ' ' ? symbol : 'space';
    return '`' + result + '`';
}
