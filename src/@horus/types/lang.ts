/**
 *  En el objeto idioma se define el campo ix como number y id como string
 *  ix: campo autoincrement
 *  id: campo con el código ISO 639-1, de nombra como id para hacer referencia desde los objetos como lang_id
 */

export interface Lang
{
    id: number;
    code: string;
    name: string;
    sort: number;
}
