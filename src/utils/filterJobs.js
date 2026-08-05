export const filterAndSortJobs = (jobs, filters) => {
  let result = [...jobs];

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(query) ||
        j.company.toLowerCase().includes(query) ||
        j.skills.some((s) => s.toLowerCase().includes(query)),
    );
  }

  if (filters.location) {
    result = result.filter(
      (j) => j.location.toLowerCase() === filters.location.toLowerCase(),
    );
  }

  if (filters.experience) {
    result = result.filter((j) => j.experience === filters.experience);
  }

  if (filters.type) {
    result = result.filter(
      (j) => j.type.toLowerCase() === filters.type.toLowerCase(),
    );
  }

  if (filters.remoteType) {
    result = result.filter(
      (j) =>
        j.remoteType &&
        j.remoteType.toLowerCase() === filters.remoteType.toLowerCase(),
    );
  }

  if (filters.sort === "latest") {
    result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  } else if (filters.sort === "oldest") {
    result.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
  } else if (filters.sort === "salary") {
    result.sort((a, b) => {
      const getVal = (salStr) => parseInt(salStr) || 0;
      return getVal(b.salary) - getVal(a.salary);
    });
  } else if (filters.sort === "experience") {
    result.sort((a, b) => parseInt(a.experience) - parseInt(b.experience));
  }

  return result;
};
