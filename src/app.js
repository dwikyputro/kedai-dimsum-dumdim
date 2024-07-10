document.addEventListener('alpine:init', () => {
    Alpine.data('menu1', () => ({
      items: [
        { id: 1, name: 'Dimsum Original ', img: 'dimsum.jpg', desc: 'Dimsum Original Kualitas Premium (5pcs)', price: 16000},
        { id: 2, name: 'Gyoza Chili Oil', img: 'chili.jpg', desc: 'Gyoza dengan Chili Oil yang bikin Ketagihan (4pcs)', price: 20000},
        { id: 3, name: 'Dimsum Mentai ', img: 'mentai.jpg', desc: 'Dimsum dengan Saus Mentai yang Nikmat (4pcs)', price: 20000},
        { id: 4, name: 'Dumpling ', img: 'dumpling.jpg', desc: 'Dumpling isi Ayam yang Flavourful (7pcs)', price: 25000},
        { id: 5, name: 'Dimsum Mix ', img: 'mix.jpg', desc: 'Dimsum dengan Isian yang Berbeda (4pcs)', price: 16000},
        { id: 6, name: 'Udang Tempura ', img: 'tempura.jpg', desc: 'Udang Goreng Crispy (10pcs)', price: 35000},
    ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            //cek apakah ada barang yg sama
            const cartItem = this.items.find((item) => item.id === newItem.id);
            //jika belum ada atau kosong
            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            }else{
                //jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
                this.items = this.items.map((item) => {
                    //jika barang berbeda
                    if(item.id !== newItem.id) {
                        return item;
                    }else{
                        //jika barang sudah ada, tambah jumlah dan total nya
                        item.quantity++;
                        item.total = item.price * item.quantity
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            //ambil item yang mau di remove
            const cartItem = this.items.find((item) => item.id === id);

            //jika item lebih dari 1
            if(cartItem.quantity > 1) {
                //telurusuri 1 1
                this.items = this.items.map((item) => {
                    //jika bukan barang yang di klik
                    if(item.id !== id) {
                        return item;
                    }else{
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            }else if(cartItem.quantity === 1){
                //jika barang sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});

//form validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function(){
    for(let i = 0; i < form.elements.length; i++){
        if(form.elements[i].value.length !==0){
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        }else{
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

//kirim data ketika tombol checkout diklik
checkoutButton.addEventListener('click', function(e){
    e.preventDefault();
        const formData = new FormData(form);
        const data = new URLSearchParams(formData);
        const objData = Object.fromEntries(data);
        const message = formatMessage(objData);
        window.open('http://wa.me/6282111462926?text=' + encodeURIComponent(message));
});

//format pesan whatsapp
const formatMessage = (obj) => {
    return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
TOTAL: ${rupiah(obj.total)}
terimakasih.`;
};

//konversi rupiah
const rupiah = (number) =>{
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};