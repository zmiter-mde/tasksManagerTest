export const getSortingObject = (sortedBy, sortedAsc) => {
    return {
        field: sortedBy,
        direction: sortedAsc ? 'asc' : 'desc'
    };
};