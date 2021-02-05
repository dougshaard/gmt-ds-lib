## Para poder usar, basta digitar o seguinte codigo
> npm i gmt-ds-lib

Assim que estiver instalado, você poderá fazer a importação dessa forma.
>import objFusoHorario from '/your/path'

Nessa primeira versão,  a propria importação retorna uma função que contém uma lista com todos os objetos, para poder chamar essa função dentro de um código use dessa forma.
```
objFusoHorario()
```
O conteudo dessa informação será apresentado da seguinte forma.
```
{
abreviado: "Pacific/Honolulu"
horaPura: "-10:00"
label: "(GMT-10:00) Hawaii"
nomeAlternativo: "Pacific/Honolulu"
value: "Pacific/Honolulu"
}
```
Já retorno um **label** e um **value** para evitar que façam processos a mais para poder usar em um seletor comum.
