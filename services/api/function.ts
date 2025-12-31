import api from '@/lib/api/axios';
import { getErrorMessage } from '@/utils/errorHandler';

// 1. Tipado de salida mejorado usando Discriminated Union
type ServiceResponse<T> = 
  | { success: true; data: T; error?: never } 
  | { success: false; data?: never; error: string };

/**
 * Función genérica para peticiones POST
 * @param url - Endpoint (ej: '/api/v1/registro-taichi')
 * @param body - Datos a enviar (Tipado con TBody)
 */
export const postGeneric = async <TResponse, TBody>(
  url: string, 
  body: TBody
): Promise<ServiceResponse<TResponse>> => {
  
  try {
    // Especificamos que la respuesta de axios sea de tipo TResponse
    const { data } = await api.post<TResponse>(url, body);
    
    return {
      success: true,
      data: data
    };

  } catch (err) {
    const errorMsg = getErrorMessage(err);
    
    return {
      success: false,
      error: errorMsg
    };
  }
};