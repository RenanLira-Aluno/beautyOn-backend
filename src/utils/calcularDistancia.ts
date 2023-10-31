export function calcularDistancia(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const raioTerra = 6371; // Raio da Terra em quilômetros
  const dLat = paraRadianos(lat2 - lat1);
  const dLon = paraRadianos(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(paraRadianos(lat1)) *
      Math.cos(paraRadianos(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanciaEmKm = raioTerra * c; // Distância em quilômetros
  const distanciaEmMetros = distanciaEmKm * 1000; // Converter para metros
  return distanciaEmMetros;
}

function paraRadianos(graus) {
  return graus * (Math.PI / 180);
}
