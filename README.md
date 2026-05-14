## Web Tabanlı Programlama Dönem Projesi
[cite_start]Bursa Teknik Üniversitesi, Bilgisayar Mühendisliği Bölümü[cite: 1, 2].

[cite_start]**Geliştiriciler:** Mustafa Mert (24360859050) ve Efe Aslan (24360859073)[cite: 4, 5].

##  Projenin Amacı ve Hedefi 
[cite_start]Projenin temel amacı, son yıllarda yapılmış olan oyun geliştirme yarışmalarından seçtiğimiz bir oyunun temel mekaniklerini HTML5 ve JavaScript ile "canvas" kullanarak geliştirmektir[cite: 14]. 

[cite_start]**Oyunun Zorluğu ve Hedefi:** Oyuncunun temel hedefi, mermilerini idareli kullanarak düşmanları yok etmek ve engelleri aşmaktır[cite: 28, 29]. [cite_start]Geri tepme (recoil) mekaniği sayesinde oyuncular, silah ateşlendiğinde oluşan itici gücü platformlar arası geçişte stratejik bir avantaj olarak kullanmalıdır[cite: 25, 27].

##  Bağlantılar
* [cite_start]**Oynanabilir Web Sürümü (GitHub Pages):** [Tıklayınız](https://mustafamrtt.github.io/platformer/) [cite: 74]
* [cite_start]**Seçilen Oyun Sayfası:** [Tıklayınız](https://poonch.itch.io/recoil) [cite: 73]
* [cite_start]**GitHub Kaynak Kodları:** [Tıklayınız](https://github.com/mustafamrtt/platformer) [cite: 75]

##  Oyun Kontrolleri
* [cite_start]**Nişan Alma ve Ateş Etme:** Farenin (crosshair) konumu ile hedeflenir ve fare tıklaması ile ateş edilir[cite: 30].
* [cite_start]**Hareket ve Zıplama:** Karakter sağa/sola koşabilir ve yerdeyken zıplayabilir[cite: 15, 21].

##  Oyun İçi Görüntüler
[cite_start]*(Aşağıdaki görseller oyunun temel platform dinamiklerini ve düşman yerleşimlerini göstermektedir)*[cite: 53].




![Oyun İçi Görüntü 1](<img width="1798" height="900" alt="image" src="https://github.com/user-attachments/assets/3be15174-7a28-4122-b1e0-26bb8eaca656" />
) 
![Oyun İçi Görüntü 2](<img width="1798" height="900" alt="image" src="https://github.com/user-attachments/assets/0253a295-8c5d-43ea-b326-2ab9a1f4382a" />

)


##  Oyun Mekanikleri ve Teknik Tasarım

### 1. Karakter Hareket ve Fizik Dinamikleri
[cite_start]Oyunun fizik motoru, gerçek dünya dinamiklerinin oyuna uyarlanmasıyla oluşturulmuştur[cite: 17].
* [cite_start]**İvmelenme ve Sürtünme:** Karakterin hareketi anlık duruşlar yerine sürtünme katsayısı (`friction: 0.125`) ile sönümlenir[cite: 18].
* [cite_start]**Yerçekimi:** Sürekli uygulanan dikey ivme (`gravity: 0.1`), karakterin boşlukta düşmesini sağlar[cite: 20]. 
* [cite_start]**Zıplama:** Karakter sadece yerdeyken (`isOnGround`) tetiklenen bir dikey hız (`-5.0`) değişimi ile zıplar[cite: 21, 22].
* [cite_start]**DeltaTime (Kare Bağımsız Hız):** Karakterin hızı her karede `deltaTime` ile çarpılarak güncellenir; böylece donanım performansından bağımsız sabit bir oyun hızı sunulur[cite: 22, 23].

### 2. Savaş Mekanikleri ve Varlıklar
* [cite_start]**Vektörel Geri Tepme (Recoil):** Silah ateşlendiğinde, merminin çıkış açısının tam tersi yönünde karaktere bir itme kuvveti (`impulse: 7.0`) uygulanır[cite: 26, 27].
* [cite_start]**Düşmanlar (Enemies):** Temas edildiğinde karakteri öldüren ve vurulduğunda animasyonunu tamamlayarak bellekten silinen sınıflardır[cite: 33].
* [cite_start]**Tuzaklar (Spikes):** Mermilerden etkilenmeyen, ancak temas anında bölümü başa döndüren statik engellerdir[cite: 34].
* [cite_start]**AABB Collision (Çarpışma Testi):** Tüm objeler arasındaki etkileşim, dikdörtgen sınırlayıcı kutuların kesişimini kontrol eden bir algoritma ile yönetilir[cite: 35].
* [cite_start]**Görsel ve Animasyon Sistemi:** Karakter animasyonları tek bir görsel üzerinden kare kare okunur (Sprite Sheet)[cite: 37]. [cite_start]Hareket yönüne göre `context.scale(-1, 1)` komutu kullanılarak varlıklar aynalanır[cite: 40, 41].

##  Grup Üyelerinin Rol Dağılımı

[cite_start]**Mustafa Mert** [cite: 56]
[cite_start]Oyunun temel omurgasından, performansından ve fizik kurallarından sorumludur[cite: 57].
* [cite_start]`requestAnimationFrame` kullanarak ana oyun döngüsünün (gameLoop) kurulması ve `deltaTime` optimizasyonunun yazılması[cite: 58].
* [cite_start]Karakterin yerçekimi, zıplama ve sürtünme dinamiklerinin matematiksel olarak koda dökülmesi[cite: 59].
* [cite_start]Karakterin platformlarda durabilmesini ve dikenlere (Spike) çarptığında ölmesini sağlayan Eksen Hizalı Çarpışma (AABB Collision Detection) algoritmasının yazılması[cite: 60, 61].
* [cite_start]Karakter ilerledikçe platformların ve engellerin geriye doğru akmasını sağlayan kaydırma (offset) mantığının ayarlanması[cite: 62, 63].

[cite_start]**Efe Aslan** [cite: 64]
[cite_start]Oyunun içindeki aktörlerin, savaş mekaniklerinin ve görselliğin kodlanmasından sorumludur[cite: 65].
* [cite_start]Düşman (Enemy), Mermi (Bullet) ve Silah (Rifle) gibi oyun objelerinin Nesne Yönelimli Programlama (OOP) mantığıyla bağımsız sınıflar olarak yazılması[cite: 66].
* [cite_start]Fare (crosshair) açısına göre trigonometrik hesaplamalarla (`Math.cos` / `Math.sin`) mermi yönünün belirlenmesi ve Geri Tepme (Recoil) fiziğinin uygulanması[cite: 67, 68, 69].
* [cite_start]Sprite Sheet görsellerinin parçalanarak kare kare oynatılması ve karakterin yönüne göre görsellerin aynalanması (`context.scale`)[cite: 70].
* [cite_start]Ses efektlerinin eklenmesi ve mermi sistemi yönetimi[cite: 71].
