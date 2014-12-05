Schedule
--------

|Title|Author|Begin|End|Est|
|-----|------|-----|---|---|
|High performance Web Sites|Steve Souders|2014-11-19|2014-11-27|2w|
|Even Faster Web Sites|Steve Souders|2014-11-28|-|3w|

Reading list
------------

|Title|Author|
|-----|------|
|HTTP Specification||
|HTTP: The Definitive Guide|Gourley|

Notes
-----

### Even Faster Web Sites ++++

> Typically, however, the bottleneck is not JavaScript, but the DOM, so fiddling with scripts will have little effeciveness.

<!-- -->

> Avoid obscure idioms that might be faster unless you can prove that they will have a noticeable impact on your application.

Jakob Nielsen's definition of "fast enough":

* **0.1 second**: limit for users feeling that they are directly manipulating objects in the UI.
* **1 second**: limit for users feeling that they are freely navigating the command space without having to unduly wait for the computer.
* **10 seconds**: limit for users keeping their attention on the task.

Google Gears worker API is the HTML5 Web Worker API's predecessor.

Techniques of non-blocking script downloading:

* XHR Eval
* XHR Injection
* Script in Iframe
* Script DOM Element
* Script Defer
* `document.write` Script Tag

Asyncronous script coupling techniques:

* External/Inline
  * Hardcoded Callback
  * Window Onload
  * Timer
  * Script Onload
  * Degrading Script Tags
* External/External
  * Managed XHR
  * DOM Element and `document.write`

> Stylesheets followed by an inline script block any subsequent resources from downloading.

<!-- -->

> A good rule of thumb is to store any out-of-scope variables in a local variable whenever it's used more than once within the function.

`with` and `catch` statements temporaly augment scope chain, therefore slowing down local identifiers resoluton.

Access to local variables is significantly faster than access to array items or object properties.

The fastest conditionals:

* `if`: no more than 2 conditions
* `switch`: more than 2 but fewer than 10 conditions
* array lookup: more than 10 conditions

> Adding the items directly into the appropriate index is slightly faster than calling `push` for each value.

### High performance Web Sites ++++

Только 10-20% от времени загрузки страницы затрачивается на получение html-документа. До 90% времени уходит на загрузку компонентов, обработку кода и отрисовку.

CDN — не только для загрузки jQuery на прототипе. Все сайты из Top10 рейтинга Alexa используют услуги CDN-провайдеров. 
Для повышения надёжности можно использовать двух провайдеров.

При скорости загрузки страницы нужно помнить, что клиенты не сидят в ста метрах от твоего офиса.

Заголовок `max-age`, в отличие от `expires`, не страдает от рассинхронизации времени на клиенте и сервере.

Рекомендация RFC: не стоит задавать значение заголовка `max-age` больше одного года.

При перезагрузке страницы браузер отправляет запрос на сервер даже при наличии актуального кэша.

Заголовок `Vary` указывает прокси-серверу, для каких заголовков хранить отдельные версии кэша. Так, `Vary: Accept-Encoding` инициирует создание отдельной версии кэша для браузеров, не поддерживающих сжатие.

У гугла есть свой алгоритм сжатия — `sdhc`.

Браузеры могут блокировать отрисовку, пока не загрузятся все файлы стилей. Поэтому стили следует подключать вверху страницы.

Обфускация уменьшает размер файла на 1-10% эффективнее минификации. После сжатия `gzip` разница уменьшается до 1%.

Редиректы увеличивают время загрузки страницы. В большинстве случаев их можно заменить другими методами.

Изящный способ оптимизации: сервер в ответе указывает версию протокола `HTTP 1.0`, чтобы увеличить количество параллельных запросов на один хост с 2 до 4.

Для счётчиков следует использовать код ответа `204 No Content`.

Если для статики использовать отдельный хост, браузер не будет отправлять туда пользовательские куки.