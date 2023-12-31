import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { useGeolocated } from "react-geolocated";
import Swal from "sweetalert2";
import axios from "axios";
import KTP from "../../src/ktp.png";
import LoadingPage from "@/Components/LoadingPage";
import Boy from "../../src/foto-diri-boy.png";
import Girl from "../../src/foto-diri-girl.jpg";

export default function TambahRelawan({ session, provinsi, calon }) {
    const { errors } = usePage().props;
    const inputRef = useRef(null);
    const foto_diri_ref = useRef(null);
    const checkbox = useRef(null);

    useEffect(() => {
        console.log("errors", errors);
    }, [errors]);
    const { data, setData, post, processing } = useForm({
        nama: null,
        alamat: null,
    });
    const [Latitude, SetLatitude] = useState(null);
    const [Longitude, Setlongitude] = useState(null);
    const [Kota, SetKota] = useState([]);
    const [Kecamatan, SetKecamatan] = useState([]);
    const [Desa, SetDesa] = useState([]);
    const [Alamat, SetAlamat] = useState({
        provinsi_id: 0,
        kota_id: 0,
        kecamatan_id: 0,
        desa_id: 0,
    });
    const [Umur, SetUmur] = useState(null);
    const [FotoKTP, SetFotoKTP] = useState(null);
    const [FotoDiri, SetFotoDiri] = useState(null);
    const [PreviewFotoDiri, SetPreviewFotoDiri] = useState(null);
    const [PreviewImage, SetPreviewImage] = useState(null);
    const [LoadingUp, SetLoadingUp] = useState(false);
    const [JenisKelamin, SetJenisKelamin] = useState(0);

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
        });

    useEffect(() => {
        SetLatitude(coords?.latitude);
        Setlongitude(coords?.longitude);
    }, [coords]);

    const [AllowLocation, SetAllowLocation] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                SetAllowLocation(true);
            },
            (err) => {
                // Swal.fire({
                //     icon: "info",
                //     title: "Kami membutuhkan lokasi anda",
                //     text: "Aktifkan di pojok atas kiri tanda seru",
                // });
                SetAllowLocation(false);
            }
        );

        navigator.permissions.query({ name: "geolocation" }).then((ress) => {
            if (ress.state === "denied") {
                // report(result.state);
                SetAllowLocation(false);
            }
        });
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClickFile = () => {
        inputRef.current.click();
    };

    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            SetFotoKTP(e.target.files[0]);

            const oFReader = new FileReader();
            oFReader.readAsDataURL(e.target.files[0]);

            oFReader.onload = function (oFREvent) {
                let imageSrc = oFREvent.target.result;
                SetPreviewImage(imageSrc);
            };
        }
    };
    const handleChangeFotoDiri = (e) => {
        if (e.target.files.length) {
            SetFotoDiri(e.target.files[0]);

            const oFReader = new FileReader();
            oFReader.readAsDataURL(e.target.files[0]);

            oFReader.onload = function (oFREvent) {
                let imageSrc = oFREvent.target.result;
                SetPreviewFotoDiri(imageSrc);
            };
        }
    };

    const handleSubmit = () => {
        SetLoadingUp(true);

        if (false) {
            Swal.fire({
                icon: "info",
                title: "Kami membutuhkan lokasi anda",
                text: "Aktifkan di pojok atas kiri tanda seru",
            });
        } else if (!data.nama || !data.alamat) {
            Swal.fire({
                icon: "info",
                title: "Data tidak lengkap",
            });
            SetLoadingUp(false);
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    SetAllowLocation(true);
                },
                (err) => {
                    // Swal.fire({
                    //     icon: "info",
                    //     title: "Kami membutuhkan lokasi anda",
                    //     text: "Aktifkan di pojok atas kiri tanda seru",
                    // });
                    SetAllowLocation(false);
                }
            );

            let errAlamat = null;

            if (!Alamat.provinsi_id) {
                errAlamat = "Provinsi";
            } else if (!Alamat.kota_id) {
                errAlamat = "Kota";
            } else if (!Alamat.kecamatan_id) {
                errAlamat = "Kecamatan";
            } else if (!Alamat.desa_id) {
                errAlamat = "Kecamatan";
            } else if (!Umur) {
                errAlamat = "Tanggal Lahir";
            }

            if (errAlamat) {
                Swal.fire({
                    icon: "info",
                    title: `Silahkan Lengkapi ${errAlamat}`,
                    text: `Data Anda Belum Lengkap`,
                });
                SetLoadingUp(false);
            } else if (!FotoKTP) {
                Swal.fire({
                    icon: "info",
                    title: `Silahkan Upload KTP`,
                    text: `Data Anda Belum Lengkap`,
                });
                SetLoadingUp(false);
            } else if (JenisKelamin === 0) {
                Swal.fire({
                    icon: "info",
                    title: `Silahkan Pilih Jenis Kelamin`,
                    text: `Data Anda Belum Lengkap`,
                });
                SetLoadingUp(false);
            } else if (!FotoDiri) {
                Swal.fire({
                    icon: "info",
                    title: `Silahkan Upload Foto Diri Anda`,
                    text: `Data Anda Belum Lengkap`,
                });
                SetLoadingUp(false);
            } else if (!checkbox.current.checked) {
                Swal.fire({
                    icon: "info",
                    title: `Silahkan setujui pernyataan anda sebagai relawan`,
                });
                SetLoadingUp(false);
            } else {
                SetLoadingUp(true);
                const formData = new FormData();
                formData.append("nama", data.nama);
                formData.append("alamat", data.alamat);
                formData.append("provinsi", Alamat.provinsi_id);
                formData.append("kota", Alamat.kota_id);
                formData.append("desa", Alamat.desa_id);
                formData.append("kecamatan", Alamat.kecamatan_id);
                formData.append("tanggal_lahir", Umur);
                formData.append("latitude", Latitude);
                formData.append("longitude", Longitude);
                formData.append("foto_ktp", FotoKTP);
                formData.append("foto_diri", FotoDiri);
                formData.append("jenis_kelamin", JenisKelamin);

                // return;
                router.post("/addRelawan", formData);
                // SetLoadingUp(false);
            }
        }
    };

    const changeProvinsi = (e) => {
        let value = e.target.value;

        SetAlamat({ ...Alamat, provinsi_id: value });
        if (value > 0) {
            axios
                .get(`/listKota?provinsi=${value}`)
                .then((ress) => {
                    SetKota(ress.data.data);
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    };
    const changeKota = (e) => {
        let value = e.target.value;
        SetAlamat({ ...Alamat, kota_id: value });
        if (value > 0) {
            axios
                .get(`/listKecamatan?kota=${value}`)
                .then((ress) => {
                    SetKecamatan(ress.data.data);
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    };
    const changeKecamatan = (e) => {
        let value = e.target.value;

        SetAlamat({ ...Alamat, kecamatan_id: value });
        if (value > 0) {
            axios
                .get(`/listDesa?kecamatan=${value}`)
                .then((ress) => {
                    SetDesa(ress.data.data);
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    };
    const changeDesa = (e) => {
        let value = e.target.value;
        console.log("value", value);
        SetAlamat({ ...Alamat, desa_id: value });
        if (value > 0) {
        }
    };

    return (
        <>
            <Head title="Relawan" />
            <div className="md:w-1/3  mx-auto w-full relative">
                {LoadingUp && <LoadingPage />}
                <div className="bg-yellow-600 h-36 w-full rounded-b-3xl p-3 font-semibold text-white">
                    Daftar Relawan
                </div>
                <div className="min-h-screen  flex justify-center flex-col items-center px-3 bg-white -mt-24 rounded-t-2xl pb-8">
                    {session.success && (
                        <div className="bg-yellow-100 w-full rounded-lg px-2 text-sm mb-4">
                            <div className="font-medium w-full py-2  block">
                                Berhasil simpan data
                            </div>
                        </div>
                    )}

                    <label className="block w-full mt-4">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Nama
                        </span>
                        <input
                            type="text"
                            name="nama"
                            onChange={(e) => setData("nama", e.target.value)}
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="masukan nama"
                        />
                    </label>
                    <label className="block w-full mt-6">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Tanggal Lahir
                        </span>
                        <input
                            type="date"
                            name="tanggal"
                            onChange={(e) => SetUmur(e.target.value)}
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="masukan nama"
                        />
                    </label>

                    <label
                        htmlFor="provinsi"
                        className="block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6"
                    >
                        Jenis Kelamin
                    </label>
                    <select
                        id="provinsi"
                        onChange={(e) => SetJenisKelamin(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                    >
                        <option value={0}>Pilih jenis kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>

                    <label className="block w-full mt-6">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Alamat
                        </span>
                        <input
                            type="text"
                            name="nik"
                            onChange={(e) => setData("alamat", e.target.value)}
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="masukan nama"
                        />
                    </label>

                    <label
                        htmlFor="provinsi"
                        className="block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6"
                    >
                        Pilih Provinsi
                    </label>
                    <select
                        id="provinsi"
                        onChange={changeProvinsi}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                    >
                        <option value={0}>Pilih provinsi</option>
                        {provinsi.map((item) => {
                            return (
                                <option value={item.id_provinsi} key={item.id}>
                                    {item.nama}
                                </option>
                            );
                        })}
                    </select>
                    <label
                        htmlFor="kota"
                        className="block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6"
                    >
                        Pilih Kota/Kabupaten
                    </label>
                    <select
                        id="kota"
                        onChange={changeKota}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                    >
                        <option value={0}>Pilih kota</option>
                        {Kota.map((item) => {
                            return (
                                <option value={item.id_kota} key={item.id}>
                                    {item.nama}
                                </option>
                            );
                        })}
                    </select>

                    <label
                        htmlFor="kecamatan"
                        className="block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6"
                    >
                        Pilih Kecamatan
                    </label>
                    <select
                        id="kecamatan"
                        onChange={changeKecamatan}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                    >
                        <option value={0}>Pilih Kecamatan</option>
                        {Kecamatan.map((item) => {
                            return (
                                <option value={item.id_kecamatan} key={item.id}>
                                    {item.nama}
                                </option>
                            );
                        })}
                    </select>
                    <label
                        htmlFor="desa"
                        className="block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6"
                    >
                        Pilih Desa
                    </label>
                    <select
                        id="desa"
                        onChange={changeDesa}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                    >
                        <option value={0}>Pilih Desa</option>
                        {Desa.map((item) => {
                            return (
                                <option value={item.id} key={item.id}>
                                    {item.nama}
                                </option>
                            );
                        })}
                    </select>

                    <label
                        htmlFor="KTP"
                        className="block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6"
                    >
                        Upload KTP
                    </label>

                    <div className="text-center" onClick={handleClickFile}>
                        {PreviewImage ? (
                            <img
                                src={PreviewImage}
                                className="w-1/2 h-auto mx-auto rounded-lg"
                                alt=""
                            />
                        ) : (
                            <img
                                src={KTP}
                                className="w-1/2 h-auto mx-auto"
                                alt=""
                            />
                        )}
                        <div className="mt-2 text-sm">
                            Klik untuk upload KTP
                        </div>

                        <input
                            type="file"
                            ref={inputRef}
                            className=""
                            hidden
                            accept="image/*"
                            onChange={handleChangeImage}
                        />
                    </div>

                    <label
                        htmlFor="KTP"
                        className="block w-full mb-2 text-sm font-medium text-gray-900 text-left mt-6"
                    >
                        Upload Foto Diri
                    </label>
                    <div
                        className="text-center"
                        onClick={() => foto_diri_ref.current.click()}
                    >
                        {PreviewFotoDiri ? (
                            <>
                                <img
                                    src={PreviewFotoDiri}
                                    className="w-1/2 h-auto mx-auto"
                                    alt=""
                                />
                            </>
                        ) : (
                            <>
                                {JenisKelamin === "Laki-laki" ? (
                                    <>
                                        <img
                                            src={Boy}
                                            className="w-1/2 h-auto mx-auto"
                                            alt=""
                                        />
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={Girl}
                                            className="w-1/2 h-auto mx-auto"
                                            alt=""
                                        />
                                    </>
                                )}
                            </>
                        )}
                        <div className="mt-2 text-sm">
                            Klik untuk upload Foto Diri
                        </div>

                        <input
                            type="file"
                            ref={foto_diri_ref}
                            className=""
                            hidden
                            accept="image/*"
                            onChange={handleChangeFotoDiri}
                        />
                    </div>

                    <div className="mt-4">
                        <div className="bg-yellow-50 p-3 rounded-lg">
                            <div className="">
                                Dengan menyetujui ini anda telah bersedia dan
                                terdaftar sebagai relawan Prayudha
                                Septiadi Wijaya.
                            </div>

                            <div className="flex items-center mt-2">
                                <input
                                    id="checked-checkbox"
                                    type="checkbox"
                                    ref={checkbox}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
                                />
                                <label
                                    for="checked-checkbox"
                                    className="ml-2 text-sm font-medium text-gray-900 "
                                >
                                    Saya Setuju
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className=" text-center w-full mt-3">
                        <div
                            className="mt-4 bg-yellow-600 text-center py-2  px-10 rounded-lg text-white w-full"
                            onClick={handleSubmit}
                        >
                            Daftar
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
