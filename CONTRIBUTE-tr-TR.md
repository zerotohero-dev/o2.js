            ___       _
      ____ |__ \     (_)____
     / __ \__/ /    / / ___/
    / /_/ / __/_   / (__  )    A Coherent Solution
    \____/____(_)_/ /____/  to Your JavaScript Dilemma ;)
               /___/

**[o2.js][o2jscom]** Koduna Nasıl Katkıda Bulunabilirim
--------------------------------------------------------------------------------

### Giriş

> Özgür yazılım tüm dünyayı değiştirdi, ve değiştirmeye de devam edecek, ve coğunuzun özgür yazılım projelerine katkıda bulunmak istediği de bir **gerçek**. Ve çoğunuz tepenizdeki camdan bariyeri kırmaktan korkuyorsunuz, ve projeye katkıda bulunmak gözünüzde büyüyor.

Bu repository'de bazı şeyler (örneğin bu CONTRIBUTE dosyası) bu sanal bariyeri yok etmek için tasarlandı.

Ayrıca [yapılacaklar listesine][open-issues] bakarsanız, "nereden başlamak gerektiği" konusunda bir fikir vermesi için işlerin zorluk derecelerine göre **@@beginner**, **@@intermediate**, ve **@@advanced** olarak etiketlendiğini göreceksiniz.

> Kabul etmek gerek, [yapılacaklar listesi][open-issues] de kendi içinde karmakarışık &ndash; Eğer bir işi ilginç bulduysanız, fakat başlamak için çok karmaşık geliyorsa, ilgili işin altına bir yorum yazarsanız ihtiyacınız olan yardımı alırsınız.

Fakat önce standart bahanelerden kurtulalım:

* Özgür yazılıma katkıda bulunmak için süper bir programcı olmak zorunda **değilsin**;
* Özgür yazılıma katkıda bulunmak için çok fazla boş vaktin olması da **gerekmiyor**;
* Özgür yazılıma katkıda bulunmak için projenin tüm kodunu okumak zorunda **değilsin**;
* Özgür yazılıma katkıda bulunmak için kod yazmak zorunda bile **değilsin**.

Aksine:

* **Herkes** katkıda bulunabilir;
* **Herhangi bir katkı** hiç kaktıda bulunmamaktan iyidir;
* **Aslında kaşık yok**: Projeye katkıda bulunmak için varolduğunu düşündüğün bariyer sadece senin zihninde, başka bir yerde değil.

Yeni bir kod çatısı tasarlamak bir miktar ilham ve liderlik gerektirir, ve projeyi başarılı kılan, bu ilk aşamadan sonra harcanan "alınteri"dir. Projeye yaptığınız katkı sadece bu kodu kullananlar tarafından değil ayrıca


* Diğer özgür yazılım heveslileri;
* Çevren ve iş arkadalşarın;
* Ve *potansiyel* işverenlerin&hellip;

tarafından fark edilecektir.

Değer katman için çeşitli yollar var, ve aktif olarak kod yazman bunlardan sadece biri:

### **[o2.js][o2jscom]** Kütüphanesini Projelerinde Kullan

Eğer projelerinde **[o2.js][o2jscom]** kullanıyorsan bizi de haberdar etç

Bunu bir [issue açarak][issues] ve burda öneri ve yorumlarını paylaşarak yapabilirsin.

### Çevrenle Paylaş

**[o2.js][o2jscom]** hakkında bir şeyler yaz;

Bir blogun mu var? **[o2.js][o2jscom]**i bloguna konu et.

Facebook mu kullanıyorsun? **[o2.js][o2jscom]**i on **Facebook**ta paylaş.

Twitter mı kullanıyorsun? **[o2.js][o2jscom]** hakkında twitle.

### Yeni Yapılacak İşler Oluştur

Bir fikrin, ya da bir önerin, ya da merak ettiğin bir şey me var

Have an idea, have a suggestion? &ndash; O zaman [bir issue oluştur][issues].

### Yeni Bir Özellik Önerisinde BUlun

Yukarıdakı ile ilişkili olarak, **[o2.js][o2jscom]** için yeni özellikler ya da ilginç ve yaratıcı bir şeyler de önerebilirsin.

Eğer önerdiğin şeyleri kodlamaya da başlarsan, sana ekstra puan **;)**

### Bir Hatayı Takip Et ve Nedenini Belirle

Hatalar genellikle çok eksik raporlanır.

Bir bug bulup, bu bug'ı inceleyip ek bir şeyler bulduğunda, bulduklarını aynı issue'nun altında **yorum** olarak paylaşman insanlara zaman kazandıracaktır.

Problemin asıl nedeini bulmaya çalış:

* Tekrarlanabilir mi, yoksa ad-hoc bir şey mi?
* Problemi tekrarlamak için hangi aşamalardan geçmek lazım?
* Problem hangi tarayıcı ve işletim sisteminde oluşuyor?
* Problemi indirgeyebilir misin? (*örneğin, bir tarayıcıda çalışıp, başka bir tarayıcıda sorun çıkarması gibi*)

Bulgularını issue'nun yorumları altına ekle ki, herkes görebilsin. Çabaların mutlaka bir başkasının sorunu daha rahat çözmesine yardımcı olacaktır.

### Dokümantasyona Yardım Et

> Dokümantasyon sevişmek gibidir. İyi olduğunda **gerçekten** iyidir.
> Kötü olduğunda da hiç yoktan iyidir ;)

Dokümantasyon genellikle projeye aşina kişiler tarafından yazılmış olduğundan sorunludur.

> Projeye henüz yeni kanalize olan birinin taze fikir ve görüşleri kaliteli bir dokümantasyon üretmek için mutlaka gereklidir.
>
> Eğer dokümantasyonda eksik, ya da mantığa aykırı bir şeyler görüyorsanız bununla ilgili bir *güncelleme önerin**.
>
> Pek çok varsayılan kavram, projeye çok da hakim değilseniz o kadar belirgin olmayabilir.

#### Dokümantasyon Sentaksı

**[o2.js][o2jscom]**, dokümantasyonlarında [YUIDoc syntax][yuidoc] sentaksı kullanır. Bu sentaksa, kaynak kodunu okuyarak alışabilirsiniz.

Bir örnek fonksiyon dokümantasyonu:

~~~
/**
 * Defers tasks to `requestAnimationFrame`.
 *
 * Use this instead of `window.setTimeout`.
 *
 * @method setTimeout
 * @static
 * @final
 *
 * @example
 *     var timer = require('amd/o2/timer/core');
 *
 *     var id = timer.setTimeout(function() {
 *         console.log('This will run at least after a second');
 *     }, 1000);
 *
 * @param {Function} delegate - the delegate to execute in the future.
 * @param {Number} timeout - timeout in milliseconds.
 *
 * @returns {Number} - a timeout id that we can use to clear the timeout.
 */
~~~

> **[o2.js][o2jscom] dokümantasyonunu derlemek için `grunt doc` komutunu kullan.
>
> **[INSTALL.md][install]** dosyasında kurulum ve konfigürasyonla ilgili daha fazla ayrıntı bulabilirsin.

### Kodda Gizlenmiş "TODO"ları ara

`grep -RIn TODO .` gibi bir komutu `o2.js/src` dizininde kullanıp "TODO"ları bulup, ya kodu **fork**layıp kendin düzeltebilir (oraya birazdan geleceğiz); ya da konuyla ilgili [bir issue][issues] açabilirsin.

### İhtiyacın Olan Bir Özelliği Geliştir

Bir prolem mi yaşıyorsun? Yeni bir özelliğe mi ihtiyacın var? O zaman projeyi **forking**la ve bu özelliği kendin geliştir; ardından bir **pull request** gönder ki ana kaynakla birleşsin.

Çözümün mükemmel olmak zorunda değil. Sunduğun çözüm, gelecek tartışma ve geliştirmeler için bir başlangıç noktası olacak.

### Bir Kullanım Örneği Ekle

**examples** dizininin ilgine ihtiyacı var. Buraya yeni örnekler koyman harika olur.

Ayrıca kullandığın herhangi bir özellikle ilgili bir blog yazabilir ve bu blogun linkini bir **issue** olarak paylaşabilirsin.

> Çok fazla örneği olan proje yoktur. Ve güzel bir örnek projenin nasıl kullanılması gerektiğini binlerce sayfa dokümantasyondan daha iyi açıklar

### Unit Testler Ekleyin

**[o2.js][o2jscom]** iki test dizini kullanıyor:

* **test/web** for testing **AMD** modülleri için;
* Ve **test/node** for testing **Node.JS** modülleri için.

> “Çok fazla test” diye bir şey yoktur. **test** klasörüne yeni testler eklemekten çekinme.

Testleri `grunt testAll` komutu ile çalıştırabilirsin.

### Bir Yorum Ekle

Kodu okurken bazı bölümleri kafa karıştırıcı bulabilirsin. Ve eğer kod senin kafanı karıştırıyorsa, bir başkasının da kafasını karıştırabilir.

Kodun amacını tam anlayamasan da, kodda her zaman ekstra açıklama ve dokümantasyon gerektiğine dair bir yorum bırakabilirsin.

### Elini Taşın Altına Koy ve **[o2.js][o2git]**i Forkla

> **[o2.js][o2git]** her forklandığında gökkuşağının üstünden bir unicorn atlıyor.

Kaynak koda dalıp bir şeyler yapmak istemen **harika**!

Eğer öyle ise, işte sana hızlı bir yönerge:

![Read the Source Luke](http://o2js.com/assets/luke.png)

1.  Başlamadan, [o2.js **JavaScript** Conventions & Best Practices][conventions] dokümanını **dikkatlica** oku.
2.  **Kaynak Kodu** oku ve yukarıdaki konvansiyonların kodda nasıl uygulandığını incele.
3.  **[o2.js][o2git]**i forkla.
4.  Forkunu yerel bir repository'e klonla.
5.  **dev** branch'ında olduğuna emin ol.
6.  **dev branch'ından yeni bir branch oluştur**, branch'a yapacağın şeye uygun bir **topic** ismi ver.
7.  Değişikliğini yap.
8.  Kodunu `grunt lint`den geçir.
9.  Ardından `grunt complexity`yi çalıştırıp kodda karmaşık bir şeyler var mı diye bak. Varsa kodunu basiteştir.
10. **publish** betiğini çalıştır (`grunt publish`).
11. **topic branch**ı **dev** branch üzerine **merge** et.
12. **dev** branch'ı **push** et.
13. S<https://github/v0lkan/o2.js/> projesine bir **pull request** gönder.

#### Adım Adım Açıklama

#### grunt kurulumu

[Burada yazanları takip et][grunt-start].

[grunt-start]: http://gruntjs.com/getting-started

#### Git Kurulumu

* [Mac için git kurulumu][gitmac]
* [Windows için git kurulumu][gitwin]
* [Linux için git kurulumu][gittux]

[gitmac]: http://help.github.com/mac-set-up-git/
[gitwin]: http://help.github.com/win-set-up-git/
[gittux]: http://help.github.com/linux-set-up-git/

#### **[o2.js][o2jscom]** Projesini Forkla

**[o2.js][o2jscom]**'i forklamak çok kolay

* <https://github/v0lkan/o2.js/> adresine git;
* **fork** butonuna tıkla (korkma, yemez seni).

![Fork Example](http://o2js.com/assets/fork.png)

* Your **forked** repository will look like the following, on github:

![Forked Repository](http://o2js.com/assets/jose.png)

* Proje dizinine git:

~~~
$ cd ~/PROJECT/
~~~

* Forkladığın repository'i dev branch'ına aktar:

~~~
git clone git@github.com:josecapablanca/o2.js.git
cd o2.js
git checkout -b dev origin/dev
~~~

* dev branch'ta olduğundan emin ol:

~~~
$ git branch
        * dev
          master
~~~

* **dev**den ayrıl:

~~~
$ git branch DocumentationReminder
$ git checkout DocumentationReminder
~~~

* Kodunu geliştir.

* Tamamlayınca kodunu lintle:

~~~
$ grunt lint

Running "jshint:src" (jshint) task
>> 10 files lint free.

Done, without errors.
~~~

* Karmaşıklık analizi yap:

~~~
$ grunt complexity

Running "complexity:generic" (complexity) task

✓ src/o2/ajax/core.js                         ████████ 161.23
✓ src/o2/ajax/node_modules/o2.string/core.js  █████████ 171.00
✓ src/o2/debug/core.js                        █████████ 173.48
✓ src/o2/io/core.js                           █████████ 171.00
✓ src/o2/object/core.js                       ████████ 170.10
✓ src/o2/string/core.js                       █████████ 171.00
✓ src/o2/timer/config.js                      ██████ 133.03
✓ src/o2/timer/core.js                        ██████ 135.74
✓ src/o2/timer/node_modules/o2.debug/core.js  █████████ 173.48

Done, without errors.
~~~

* Publish betiğini çalıştır. Çıktısı şuna benzer olacaktır:

~~~
$ grunt publish

Running "exec:clean" (exec) task

Running "exec:install" (exec) task
>> npm
>> http GET https://registry.npmjs.org/o2.string/0.0.7
>> npm
>> http 304 https://registry.npmjs.org/o2.string/0.0.7
o2.string@0.0.7 node_modules/o2.string
>> npm
>>
>> http
>> GET https://registry.npmjs.org/o2.debug/0.0.2
>> npm
>> http 304 https://registry.npmjs.org/o2.debug/0.0.2
o2.debug@0.0.2 node_modules/o2.debug

Running "exec:amdify" (exec) task

Running "jshint:src" (jshint) task
>> 10 files lint free.

Running "complexity:generic" (complexity) task

✓ src/o2/ajax/core.js                         ████████ 161.23
✓ src/o2/ajax/node_modules/o2.string/core.js  █████████ 171.00
✓ src/o2/debug/core.js                        █████████ 173.48
✓ src/o2/io/core.js                           █████████ 171.00
✓ src/o2/object/core.js                       ████████ 170.10
✓ src/o2/string/core.js                       █████████ 171.00
✓ src/o2/timer/config.js                      ██████ 133.03
✓ src/o2/timer/core.js                        ██████ 135.74
✓ src/o2/timer/node_modules/o2.debug/core.js  █████████ 173.48

Done, without errors.
~~~

* **dev** ile birleş:

> Şu ana kadar her şey yokunda ise, **dev** ile birleşebilirsin.

~~~
$ git checkout dev
$ git merge DocumentationReminder
$ git branch -D DocumentationReminder
~~~

* Değişikliklerini uzak depoya yükle:

~~~
$ git push origin dev
~~~

* Upstreamini **[o2.js][o2jscom]** ana deposuna yönlendir:

~~~
$ git remote add upstream git@github.com:v0lkan/o2.js.git
~~~

* GitHub'daki depona gidip **pull** butonuna tıklayarak bir **pull request** gömder:

![Pull](http://o2js.com/assets/pull.png)

* Pull isteğinin yerel **dev branch**tan, remote **dev branch**a yapıldığına emin ol.

![Dev Branch](http://o2js.com/assets/devbranch.png)

* Eğer kodun yararlı ise, bir bug'ı çözüyorsa, veya projeyi ilerletiyorsa **[o2.js][o2jscom]** kod tabanı ile birleşecektir.
* Eğer kodun, o anki durumu ile, ana kodla birleşecek durumda değilse kodunu nasıl geliştireceğine dair ek yönergelerle birlikte nazikçe reddedilecektir. Kodu belirtilen yönde geliştirip tekrar bir **pull request** gönderirsen, o zaman merge edilebilir.

Bu, tipik bir **[o2.js][o2jscom]** katkı döngüsünü özetler. Muhtemelen, ara ara asıl kodun en güncel halini de almak isteyeceksin. Bunu **upstream**ini güncelleyerek yapabilirsin:

~~~
$ git checkout dev
$ git fetch upstream
$ git merge upstream/dev
$ git push origin dev
~~~

* **dev** dalından **branch out** ederek yeni bir katkı döngüsüne başlayabilirsin.

Bu ufak dersin de sonuna geldik.

**May the source be with you**.

[o2jscom]:       http://o2js.com/  "o2js.com - A Coherent Solution to Your JavaScript Dilemma"
[issues]:        https://github.com/v0lkan/o2.js/issues/new "o2.js - Open an Issue"
[open-issues]:   https://github.com/v0lkan/o2.js/issues?state=open&utf8=%E2%9C%93
[yuidoc]:        http://yui.github.io/yuidoc/syntax/
[grunt]:         http://gruntjs.com/
[grunt-install]: http://gruntjs.com/getting-started
[install]:       https://github.com/v0lkan/o2.js/blob/dev/INSTALL.md
[o2git]:         https://github.com/volkan/o2.js
[conventions]:   https://github.com/v0lkan/o2.js/blob/dev/CONVENTIONS.md
