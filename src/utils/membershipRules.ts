/**
 * Calculate age ranges for membership types based on current year
 */
function getMembershipAgeRanges() {
  const currentYear = new Date().getFullYear();
  return {
    senior: {
      maxYear: currentYear - 18 // 18+ years old
    },
    junior: {
      minYear: currentYear - 17,
      maxYear: currentYear - 15 // 14-15 years old
    },
    cadet: {
      minYear: currentYear - 14,
      maxYear: currentYear - 12 // 13-15 years old
    },
    minor: {
      minYear: currentYear - 11,
      maxYear: currentYear - 4 // 5-12 years old
    }
  };
}

/**
 * Determines available membership types based on birth year and role
 */
export function getAvailableMembershipTypes(dateOfBirth: string, role: string): string[] {
  if (!dateOfBirth || role !== 'athlete') {
    return [];
  }

  const birthYear = new Date(dateOfBirth).getFullYear();
  const ranges = getMembershipAgeRanges();

  if (birthYear <= ranges.senior.maxYear) {
    return ['senior'];
  } else if (birthYear >= ranges.junior.minYear && birthYear <= ranges.junior.maxYear) {
    return ['junior'];
  } else if (birthYear >= ranges.cadet.minYear && birthYear <= ranges.cadet.maxYear) {
    return ['cadet'];
  } else if (birthYear >= ranges.minor.minYear && birthYear <= ranges.minor.maxYear) {
    return ['minor'];
  }

  return [];
}