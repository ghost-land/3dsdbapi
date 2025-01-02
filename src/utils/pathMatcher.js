// Levenshtein distance calculation
function levenshteinDistance(a, b) {
    const matrix = Array(b.length + 1).fill().map(() => Array(a.length + 1).fill(0));
  
    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
  
    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }
  
    return matrix[b.length][a.length];
  }
  
  // Normalize path for comparison
  function normalizePath(path) {
    // Keep the TID part intact and normalize the rest
    const parts = path.split('/');
    return parts.map(part => {
      // If it looks like a TID (16 chars of hex), keep it as is
      if (/^[0-9A-Fa-f]{16}$/.test(part)) {
        return part;
      }
      return part.toLowerCase().replace(/[^a-z0-9]/g, '');
    }).join('/');
  }
  
  // Adjust distance based on common variations
  function adjustDistance(requestPath, availablePath, baseDistance) {
    let distance = baseDistance;
  
    // Extract the endpoint part (after TID if present)
    const reqEndpoint = requestPath.split('/').pop();
    const availEndpoint = availablePath.split('/').pop();
  
    // Common plural variations
    if (reqEndpoint.endsWith('s') && availEndpoint === reqEndpoint.slice(0, -1)) {
      distance -= 0.5;
    }
  
    // Common typos (double letters)
    if (reqEndpoint.match(/(.)\1/) && availEndpoint === reqEndpoint.replace(/(.)\1/g, '$1')) {
      distance -= 0.5;
    }
  
    // Exact match for everything before the variation
    const reqParts = requestPath.split('/');
    const availParts = availablePath.split('/');
    const commonLength = Math.min(reqParts.length, availParts.length);
    let exactMatchCount = 0;
  
    for (let i = 0; i < commonLength - 1; i++) {
      if (reqParts[i] === availParts[i]) {
        exactMatchCount++;
        // Give extra weight to TID matches
        if (/^[0-9A-Fa-f]{16}$/.test(reqParts[i])) {
          exactMatchCount += 2;
        }
      }
    }
  
    if (exactMatchCount > 0) {
      distance -= 0.5 * exactMatchCount;
    }
  
    return distance;
  }
  
  // Find closest matching path
  function findClosestPath(requestPath, availablePaths) {
    // Normalize paths for comparison
    const normalizedRequestPath = requestPath;
  
    let closestPath = null;
    let minDistance = Infinity;
  
    for (const path of availablePaths) {
      // Replace :tid with the actual TID from the request if present
      const normalizedPath = path.replace(':tid', requestPath.split('/')[1] || ':tid');
      
      const distance = levenshteinDistance(normalizedRequestPath, normalizedPath);
      
      // Adjust distance for common variations
      const adjustedDistance = adjustDistance(requestPath, path, distance);
      
      // Prioritize matches with same structure
      if (normalizedPath.split('/').length === requestPath.split('/').length &&
          adjustedDistance < minDistance) {
        minDistance = adjustedDistance;
        closestPath = path;
      }
    }
  
    // Only suggest if the distance is reasonable
    return minDistance < 2 ? closestPath.replace(':tid', requestPath.split('/')[1]) : null;
  }
  
  module.exports = { findClosestPath };