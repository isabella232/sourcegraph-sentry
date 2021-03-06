/**
 * The resolved and normalized settings for this extension, the result of calling resolveSettings on a raw settings
 * value.
 *
 * See the "contributes.configuration" field in package.json for the canonical documentation on these properties.
 */
export interface Settings {
    ['sentry.decorations.inline']: boolean
    ['sentry.organization']?: string
    ['sentry.projects']?: [SentryProject]
}

export interface SentryProject {
    projectId: string
    // RexExp patterns to match log handeling code, e.g. /log\.(Printf|Print)\(['"]([^'"]+)['"]\)/
    linePatterns?: string[]
    filters?: {
        repositories?: string[]
        files?: string[]
    }[]

    // TODO: Add these to v1.
    additionalProperties?: {
        contentText?: string // e.g. "View sourcegraph/sourcegraph_dot_com errors"
        hoverMessage?: string //  e.g. "View errors matching '$1' in Sentry"
        query?: string // e.g. "$1"
    }
}

/** Returns a copy of the extension settings with values normalized and defaults applied. */
export function resolveSettings(raw: Partial<Settings>): Settings {
    return {
        ['sentry.decorations.inline']: !!raw['sentry.decorations.inline'],
        ['sentry.organization']: raw['sentry.organization'],
        ['sentry.projects']: raw['sentry.projects'],
    }
}
