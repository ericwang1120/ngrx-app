export interface GitUser {
    id: string;
}

export function generateMockGitUser(): GitUser {
    return {
        id: '111',
    };
}
