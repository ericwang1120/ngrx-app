export interface GitRepository {
    id: string;
    name: string;
    html_url: string;
}

export function generateMockGitRepository(): GitRepository {
    return {
        id: '111',
        name: '',
        html_url: '',
    };
}
