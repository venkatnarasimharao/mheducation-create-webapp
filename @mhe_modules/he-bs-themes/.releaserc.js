const presetConfig = {
    types: [
        {
            type: "feat",
            section: "New Features",
            hidden: false,
        },
        {
            type: "fix",
            section: "Bug Fixes",
            hidden: false,
        },
        {
            type: "docs",
            section: "Documentation",
            hidden: false,
        },
        {
            type: "style",
            section: "Code Style",
            hidden: false,
        },
        {
            type: "refactor",
            section: "Refactor",
            hidden: false,
        },
        {
            type: "test",
            section: "Tests",
            hidden: false,
        },
        {
            type: "build",
            section: "CI/CD",
            hidden: false,
        },
        {
            type: "chore",
            section: "Housekeeping",
            hidden: false,
        },
    ],
}

module.exports = {
    preset: "conventionalcommits",
    branches: ['main'],
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                preset: "angular",
                releaseRules: [
                    {type: "chore", release: "patch"},
                    {type: "test", release: "patch"},
                    {type: "style", release: "patch"},
                    {type: "build", release: "patch"},
                    {type: "refactor", release: "patch"},
                    {type: 'fix', release: 'patch'},
                    {type: 'perf', release: 'patch'},
                    {type: 'docs', release: 'patch'},
                    {type: 'feat', release: 'minor'},
                    {type: 'release-minor', release: 'minor'},
                    {type: 'release-major', release: 'major'},
                ],
                "parserOpts": {
                    "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
                }
            },
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                // https://github.com/semantic-release/release-notes-generator#options
                linkCompare: true,
                preset: "conventionalcommits",
                presetConfig,
            },
        ],
        "@semantic-release/changelog",
        "@semantic-release/npm",
        "@semantic-release/git",
        [
            "@semantic-release/github",
            {
                // https://github.com/semantic-release/github#options
                githubUrl: "https://github.mheducation.com",
                githubApiPathPrefix: "/api/v3",
                // successComment: false,
            },
        ],

    ],
};
