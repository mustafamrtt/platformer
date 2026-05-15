# Web Tabanlı Programlama Dönem Projesi
Bursa Teknik Üniversitesi, Bilgisayar Mühendisliği Bölümü.

**Geliştiriciler:** Mustafa Mert ve Efe Aslan.

##  Projenin Amacı ve Hedefi (Challenge)
Projenin temel amacı, son yıllarda yapılmış olan oyun geliştirme yarışmalarından seçtiğimiz bir oyunun temel mekaniklerini HTML5 ve JavaScript ile "canvas" kullanarak geliştirmektir. 

**Oyunun Zorluğu ve Hedefi:** Oyuncunun temel hedefi, mermilerini idareli kullanarak düşmanları yok etmek ve engelleri aşmaktır. Geri tepme (recoil) mekaniği sayesinde oyuncular, silah ateşlendiğinde oluşan itici gücü platformlar arası geçişte stratejik bir avantaj olarak kullanmalıdır.

##  Bağlantılar
* Oynanabilir Web Sürümü (GitHub Pages): https://mustafamrtt.github.io/platformer/ 
* Itch.io Sayfası: https://poonch.itch.io/recoil 
* GitHub Kaynak Kodları: https://github.com/mustafamrtt/platformer 

##  Oyun Kontrolleri
* **Nişan Alma ve Ateş Etme:** Farenin (crosshair) konumu ile hedeflenir ve fare tıklaması ile ateş edilir.
* **Hareket ve Zıplama:** Karakter sağa/sola koşabilir ve yerdeyken zıplayabilir.

##  Oyun İçi Görüntüler


![Oyun İçi Görüntü 1](  <img width="1798" height="900" alt="image" src="https://github.com/user-attachments/assets/08b70dff-8e4f-44f0-b95c-70605f7ed01d" />

) 
![Oyun İçi Görüntü 2](<img width="1798" height="900" alt="image" src="https://github.com/user-attachments/assets/0253a295-8c5d-43ea-b326-2ab9a1f4382a" />

)


##  Oyun Mekanikleri ve Teknik Tasarım

### 1. Karakter Hareket ve Fizik Dinamikleri
Oyunun fizik motoru, gerçek dünya dinamiklerinin oyuna uyarlanmasıyla oluşturulmuştur.
* **İvmelenme ve Sürtünme:** Karakterin hareketi anlık duruşlar yerine sürtünme katsayısı (friction: 0.125) ile sönümlenir.
* **Yerçekimi:** Sürekli uygulanan dikey ivme (gravity: 0.1), karakterin boşlukta düşmesini sağlar. 
* **Zıplama:** Karakter sadece yerdeyken (isOnGround) tetiklenen bir dikey hız (-5.0) değişimi ile zıplar.
* **DeltaTime (Kare Bağımsız Hız):** Karakterin hızı her karede deltaTime ile çarpılarak güncellenir; böylece donanım performansından bağımsız sabit bir oyun hızı sunulur.

### 2. Savaş Mekanikleri ve Varlıklar
* **Vektörel Geri Tepme (Recoil):** Silah ateşlendiğinde, merminin çıkış açısının tam tersi yönünde karaktere bir itme kuvveti (impulse: 7.0) uygulanır.
* **Düşmanlar (Enemies):** Temas edildiğinde karakteri öldüren ve vurulduğunda animasyonunu tamamlayarak bellekten silinen sınıflardır.
* **Tuzaklar (Spikes):** Mermilerden etkilenmeyen, ancak temas anında bölümü başa döndüren statik engellerdir.
* **AABB Collision (Çarpışma Testi):** Tüm objeler arasındaki etkileşim, dikdörtgen sınırlayıcı kutuların kesişimini kontrol eden bir algoritma ile yönetilir.
* **Görsel ve Animasyon Sistemi:** Karakter animasyonları tek bir görsel üzerinden kare kare okunur (Sprite Sheet). Hareket yönüne göre context.scale(-1, 1) komutu kullanılarak varlıklar aynalanır.
