Submission untuk Technical Test

## Approach

Pertama-tama, saya memutuskan untuk menggunakan Next.js App Router untuk memanfaatkan teknologi SSR, dengan anggapan bahwa data pokemon dari server tidak terlalu sering update. Lalu saya menggunakan pnpm sebagai package manager yang disarankan oleh Next.js karena memang lebih cepat dan efisien (https://nextjs.org/learn/dashboard-app/getting-started).

Lalu saya mulai membuat component SSR page.tsx untuk memuat 10 item pertama dari API https://pokeapi.co/api/v2/pokemon. Saya menyadari bahwa di api tersebut terdapat query offset dan limit yang bisa dimanfaatkan untuk pagination. Namun saya fokus untuk slicing komponen Card dengan props terlebih dahulu, lalu membuat container grid di page.tsx untuk menampilkan Card dalam jumlah yang responsive tergantung ukuran layar client. Untuk image karena tidak ada di response awal, maka saya investigasi untuk menemukan url image dan menemukan dari https://pokeapi.co/api/v2/pokemon/:id bahwa terdapat gambar dengan nama front_default dengan alamat "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png", maka saya anggap bahwa terdapat gambar untuk setiap pokemon dengan base url yang sama, sehingga saya simpan

Setelah itu saya menerapkan pagination untuk navigasi antar page pokemon dengan mengubah search param yang diberi nama page, lalu offset atau jumlah data yang diskip dihitung berdasarkan nilai (param page - 1 \* limit), sehingga elemen yang ditampilkan akan dimulai dari data diskip dan akan menampilkan data page saat ini. Teknik ini menghasilkan page SSR dan bisa dicache sehingga lebih cepat diakses client dan juga optimized untuk SEO, dengan revalidate diatur tiap 1 jam.

Setelah itu, pada langkah terakhir saya polish User Interface dengan menambahkan ThemeContext serta animasi magnet shear serta illumination dengan library framer-motion untuk theme light maupun dark. Dan library icon saya menggunakan lucide-react untuk efisiensi waktu.
