import { AxiosError } from 'axios';

// Definimos un tipo para la respuesta de error esperada del backend (opcional pero recomendado)
interface ErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>; // Por si Laravel/NestJS devuelven arrays de errores
}

export const getErrorMessage = (error: unknown): string => {
  // 1. Si el error es de Axios
  if (error instanceof AxiosError) {
    
    // Caso A: El servidor respondió con un error (4xx, 5xx)
    if (error.response) {
      const data = error.response.data as ErrorResponse;
      // Intentamos obtener el mensaje específico que manda el backend
      if (data?.message) return data.message;
      if (data?.error) return data.error;
      
      // Fallback para códigos de estado comunes
      switch (error.response.status) {
        case 400: return 'Solicitud incorrecta (Bad Request).';
        case 401: return 'No autorizado. Por favor inicia sesión.';
        case 403: return 'No tienes permisos para realizar esta acción.';
        case 404: return 'Recurso no encontrado.';
        case 500: return 'Error interno del servidor.';
        default: return `Error inesperado: ${error.response.status}`;
      }
    }

    // Caso B: Se hizo la petición pero no hubo respuesta (Error de red/timeout)
    if (error.request) {
      return 'No hay conexión con el servidor. Verifica tu internet.';
    }
  }

  // 2. Si es un error nativo de JS o desconocido
  if (error instanceof Error) {
    return error.message;
  }

  // 3. Fallback final
  return 'Ocurrió un error desconocido. Inténtalo de nuevo.';
};