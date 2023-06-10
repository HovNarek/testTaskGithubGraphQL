interface Repository {
    id: string;
    name: string;
    stargazerCount: number;
    updatedAt: string;
    url: string;
    owner: {
        avatarUrl: string;
        url: string;
        login: string;
    };
    languages: {
        nodes: Language[];
    };
    description: string;
}

interface Language {
    name: string;
}

interface SearchRepositoriesResponse {
    search: {
        repositoryCount: number;
        edges: {
            node: Repository;
        }[];
    };
}

interface GetRepositoryByIdResponse {
    node: Repository;
}

interface GetUserRepositoriesResponse {
    viewer: {
        id: string;
        repositories: {
            totalCount: number;
            edges: {
                node: Repository;
            }[];
        };
    };
}

interface GetRepositoriesQuery {
    search: {
        repositoryCount: number;
        edges: {
            node: Repository;
        }[];
    };
}

interface GetRepositoriesQueryVariables {
    searchQuery: string;
}

export type {
    Repository,
    Language,
    SearchRepositoriesResponse,
    GetRepositoryByIdResponse,
    GetUserRepositoriesResponse,
    GetRepositoriesQuery,
    GetRepositoriesQueryVariables
};
