# Conectar el formulario a Google Sheets

Esto hace que cada reserva caiga sola en una hoja de cálculo, ya tabulada.
Es opcional: si no lo configuras, el form igual funciona y manda todo por WhatsApp.

## Pasos (una sola vez, ~5 minutos)

1. **Crea una hoja nueva** en Google Sheets (sheets.new). Ponle nombre, ej. "Sero — Reservas".

2. En el menú: **Extensiones → Apps Script**.

3. Borra el código que aparece y **pega todo el contenido de `google-apps-script.gs`** (está en esta misma carpeta).

4. Dale a **Guardar** (ícono de disquete).

5. Arriba, haz clic en **Implementar → Nueva implementación**.
   - Tipo: elige **Aplicación web** (Web app).
   - "Ejecutar como": **Yo / tú mismo**.
   - "Quién tiene acceso": **Cualquier persona** (Anyone). 
     *(Esto es necesario para que el formulario pueda enviarle datos. La URL es secreta; nadie la verá.)*
   - Clic en **Implementar**.

6. Google te pedirá **autorizar permisos** la primera vez (es tu propia hoja, es seguro). Acepta.

7. Copia la **URL de la aplicación web** que te da (termina en `/exec`).

8. Abre `src/data.js` del formulario y pega esa URL entre las comillas de:
   ```js
   export const SHEETS_URL = "AQUÍ_VA_LA_URL";
   ```

9. Vuelve a subir / re-desplegar el formulario en Vercel.

## Listo

Desde ahora, cada vez que alguien complete el formulario y toque "Enviar mis datos por WhatsApp", su reserva aparece automáticamente como una fila nueva en tu hoja — además de llegarte por WhatsApp con la captura del Yape.

La última columna de la hoja, **"DATA line (matching)"**, es la que copias en bloque y me pegas para que arme las mesas.

## Si ya tenías una hoja conectada antes de este update

El script ahora envía el campo `amas` (lo que más amas de cada mundo) en vez del antiguo `obsesiones`. Si tu hoja ya existía:

- Vuelve a pegar el contenido actualizado de `google-apps-script.gs` en Apps Script y dale **Implementar → Administrar implementaciones → Editar (lápiz) → Nueva versión → Implementar**.
- En tu hoja, renombra manualmente la columna **"Obsesiones (#1)"** a **"Lo que más ama"** (o borra la fila de encabezados y bota cualquier respuesta de prueba — la próxima reserva re-escribe los encabezados con el nuevo nombre).

## Nota

El envío a Sheets es "fire-and-forget": si por algo falla (sin internet, URL mal pegada), **no bloquea al usuario** — la persona igual pasa a WhatsApp normalmente. El WhatsApp es tu respaldo siempre; la hoja es la comodidad extra.
