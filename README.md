# Submission untuk Technical Test

Alamat repository: https://github.com/sigitwijk16/pokemon-app
Alamat profile GitHub: https://github.com/sigitwijk16

# Indonesia

## 1. How I approached the task

Pertama-tama, saya memutuskan untuk menggunakan Next.js App Router untuk memanfaatkan teknologi SSR, dengan anggapan bahwa data pokemon dari server tidak terlalu sering update. Lalu saya menggunakan pnpm sebagai package manager yang disarankan oleh Next.js karena memang lebih cepat dan efisien (https://nextjs.org/learn/dashboard-app/getting-started).

Lalu saya mulai membuat component SSR page.tsx untuk memuat 10 item pertama dari API https://pokeapi.co/api/v2/pokemon. Saya menyadari bahwa di api tersebut terdapat query offset dan limit yang bisa dimanfaatkan untuk pagination. Namun saya fokus untuk slicing komponen Card dengan props terlebih dahulu, lalu membuat container grid di page.tsx untuk menampilkan Card dalam jumlah yang responsive tergantung ukuran layar client.

Untuk image karena tidak ada di response awal, maka saya investigasi untuk menemukan url image dan menemukan dari https://pokeapi.co/api/v2/pokemon/:id bahwa terdapat gambar dengan nama front_default dengan alamat "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png", maka saya anggap bahwa terdapat gambar untuk setiap pokemon dengan base url yang sama, sehingga saya simpan imageUrl ke data pokemonList hasil response API utama dengan id hasil ekstrak dari field url dengan base url untuk front_default.

Setelah itu saya menerapkan pagination untuk navigasi antar page pokemon dengan mengubah search param yang diberi nama page, lalu offset atau jumlah data yang diskip dihitung berdasarkan nilai (param page - 1) \* limit, sehingga elemen yang ditampilkan akan dimulai dari data diskip dan akan menampilkan data page saat ini. Teknik ini menghasilkan page SSR dan bisa dicache sehingga lebih cepat diakses client dan juga optimized untuk SEO, dengan revalidate diatur tiap 1 jam.

Setelah itu, pada langkah terakhir saya polish User Interface dengan menambahkan ThemeContext dengan ThemeToggle serta animasi magnet shear serta illumination dengan library framer-motion untuk theme light maupun dark. Karena page.tsx sekarang butuh respon terhadap perubahan tema, maka keseluruhan page diekstrak ke komponen ClientHome. Dan library icon saya menggunakan lucide-react untuk efisiensi waktu. Setelah itu saya deploy project saya di Netlify dengan binding ke repository GitHub. Setelah ini bisa dilakukan iterasi update untuk optimasi beban animasi UI maupun teknik loading gambar.

## 2. What I enjoyed

Saya menyukai untuk menerapkan teknik SSR agar webpage memiliki visibility yang baik untuk Search Engine dan juga optimasi dengan cache agar page lebih seamless ketika diakses user. Saya juga menyukai memanfaatkan TypeScript untuk memastikan data yang dipass ke props sesuai dengan yang dibutuhkan komponen.

## 3. Any challenges I faced

Untuk saya tantangan terbesar adalah menerapkan animasi pada hover card dan juga memikirkan bagaimana skema warna theme dark yang sesuai dan complementary dengan tema light.

## 4. What choices I made to express my style

Saya memilih untuk menggunakan tema dengan warna simple dengan elemen rounded rectangle sebagai base dari setiap proyek saya, seperti bagaimana app modern pada umumnya. Lalu saya usahakan agar seluruh webpage di desktop tampak tanpa scroll, sehingga memudahkan user dalam menggunakan app.

# English

## 1. How I approached the task

First, I decided to use Next.js App Router to take advantage of Server-Side Rendering (SSR), assuming that Pokémon data from the server doesn’t change very often. I also used pnpm as the package manager, as recommended by the Next.js team, because it’s faster and more efficient (https://nextjs.org/learn/dashboard-app/getting-started).

Next, I created an SSR component page.tsx to load the first 10 Pokémon from the API https://pokeapi.co/api/v2/pokemon. I noticed that the API supports offset and limit query parameters, which are perfect for pagination. However, I first focused on building a reusable Card component with typed props, then displayed those cards inside a responsive grid container in page.tsx, adjusting the layout based on the client’s screen size.

Since the initial API response doesn’t include image URLs, I investigated further and found that each Pokémon has an image at
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png.
I extracted the Pokémon ID from the API’s url field and generated the image URL using that pattern, attaching it as imageUrl to each Pokémon object in the resulting list.

After that, I implemented pagination for navigating between pages by updating a page search parameter. The offset (number of skipped items) is calculated using (page param - 1) \* limit, ensuring that the current page shows the correct range of Pokémon. This technique provides SSR-rendered pages that can be cached and revalidated (every hour in my setup), which improves performance and SEO visibility.

Finally, I polished the User Interface by adding a ThemeContext and ThemeToggle, plus a magnetic shear + illumination hover effect built using framer-motion for both light and dark themes. For icons, I used lucide-react to save time. I then deployed the project to Netlify, connected to my GitHub repository. Further iterations can optimize animation performance and image-loading techniques.

## 2. What I enjoyed

I really enjoyed applying SSR techniques to improve Search Engine visibility and user experience through caching and seamless page transitions. I also liked using TypeScript to ensure that data passed through props matched component 3. requirements.

## 3. Any challenges I faced

The biggest challenge for me was implementing the hover animation on the Pokémon card and finding the right dark theme color scheme that complemented the light theme.

## 4. What choices I made to express my style

I chose a simple color scheme and rounded rectangle elements as the foundation of my design, consistent with modern web applications. I also optimized the layout so that the entire desktop webpage fits within a single viewport without scrolling, improving usability and visual flow.
