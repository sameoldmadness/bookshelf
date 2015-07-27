Schedule
--------

|Title|Author|Est|Begin|End|
|-----|------|-----|---|---|
|[High Performance Web Sites](#high-performance-web-sites-)|Steve Souders|2w|2014-11-19|2014-11-27|
|[Even Faster Web Sites](#even-faster-web-sites-)|Steve Souders|3w|2014-11-28|2015-01-14|
|[Web Performance Playbook vol.2](#web-performance-playbook-vol2-)|Stoyan Stefanov|2w|2015-01-15|2015-03-18|
|[Async JavaScript](#async-javascript)|Trevor Brunham|1w|2015-03-18|2015-03-24|
|[Mastering JavaScript design patterns](#mastering-javascript-design-patterns-)|Simon Timms|3w|2015-04-24|2015-05-14|
|[Maintainable JavaScript](#maintainable-javascript-)|Nicolas Zakas|3w|2015-03-24|2015-07-27|

Reading list
------------

|Title|Author|
|-----|------|
|HTTP Specification||
|ECMAScript 2015 Specification||
|HTTP: The Definitive Guide|Gourley|

Notes
-----

### Maintainable JavaScript +++++

Establishing style guidelines should always come as early in the process as possible.

> Figuring out guidelines is a process that typically takes longer than it should.

Variable names should begin with a noun, functions should begin with a verb. Meaningless names should be avoided.

> I recommend avoiding the use of `undefined` in code.

A case for comment:

* difficult to understand code
* potential author errors
* browser-specific hacks
* documentation

Debates on `switch`

* indentation
* falling through
* default

> Avoid primitive type wrappers

<!-- -->

> Keep JavaScript out of your CSS. Keep CSS out of JavaScript. Keep JavaScript or of HTML. Keep HTML out of JavaScript.

Comments could be used to store templates. Comments are DOM nodes, so they can be queried and their content extracted using JavaScript.

Event handling:

1. Separate application logic
2. Don't pass the event object around



### Mastering JavaScript design patterns +

> Without a proper class system, js, of course, has no concept of inheritance.

<!-- -->

> It isn't possible to create a clean implementation of the singleton pattern due to the restrictions on the constructor.

<!-- -->

> JavaScript is not a functional programming language.

### Async Javascript +

`jQuery.fn.triggerHandler` can be used if event bubbling is not desirable.

`async.js` - the most widely used Javascript control flow library.

### Web Performance Playbook vol.2 +++

Tools:

- [WebPageTest](https://www.google.ru/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB0QFjAA&url=http%3A%2F%2Fwww.webpagetest.org%2F&ei=OoYIVZ70O8TcPd-ZgPgF&usg=AFQjCNFAbhmq3XBEm4BIZ5OwnLSzHZ2mEQ&sig2=T-80MoJYwHVMfU8Ybi6pqA&bvm=bv.88528373,d.ZWU) — Website Performance and Optimization Test
- [YSlow](https://www.google.ru/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&sqi=2&ved=0CBwQFjAA&url=http%3A%2F%2Fyslow.org%2F&ei=lokIVbT8MMPUOfWNgOAH&usg=AFQjCNE9JdE5wcEh8i_vorWQGTRKrvAiiw&sig2=txewxU7qQkGGuH8Lshi2lQ&bvm=bv.88528373,d.ZWU) — analyzes web pages and why they're slow
- strace
- [confess.js](https://github.com/jamesgpearce/confess) — Uses PhantomJS to headlessly analyze web pages and generate manifests.

In order to persist across browser sessions, values in `localStorage` are written to disk. And yes, it is slow. The amount of data being read did not affect how quickly the read happened, so the best strategy is to use as few keys as possible to store as much data as possible.

Recommendations on inlining:

- very small files should be inlined
- page images should rarely be inlined
- anything that isn't critical for the above-the-fold page view should not be inlined
- be careful with inlining CSS images
- don't rely on synthetic measurements — use RUM instead

Loading third party script. stylesheet or font in a blocking manner could become a SPOF: if the resource becomes unavaliable, it will completely block page rendering.

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

Five different approaches to implementing the low-latency data communications:

* polling
* long polling
* forever frame
* XHR streaming
* websockets (to rule them all)

> Roughly 15% of visitors don't indicate gzip compression support.

<!-- -->

> Popular client software programs and web proxies modify the client's `Accept-Encoding` request header.

Techniques that can reduce a page's uncompressed size (from 5% to 20%):

* using event delegation
* using relative urls
* stripping whitespace
* stripping attribute quotes
* avoiding inline styling
* aliasing javascript names

Direct detection of gzip support: if the `Accept-Encoding` header is missing, output a hidden iframe with gzipped content as the last element of the page body.

> Strive for PNG8 whenever possible.

<!-- -->

> Crush PNG, optimize GIF animations, and strip JPEG metadata from the images _you own_. Use progressive JPEG encoding for JPEGs more than 10 KB in file size.

_Flushing_ can be used to serve documents that take long time to generate.

Reasons to avoid iframes:

* they're one to two orders of magnitude more expensive than other DOM elements
* they block the onload event (workaround: set `src` from js)
* the browser's limited connections per server are shared across the main page and iframes

Complex selectors _could_ impact performance.

Selectors are matched right to left:

* `div div div .my-class` is almost as fast as `.myclass`
* `#my-id a` is much slower than `a`

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
