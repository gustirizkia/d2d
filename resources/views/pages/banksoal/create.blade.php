@extends('layouts.admin')

@section('title')
    Tambah Data Bank Soal
@endsection

@push('addStyle')
    <style>
        .add_skip{
            background-color: antiquewhite;
            height: 100px;
            width: 100%;
            margin-top: 10px;
            cursor: pointer;
        }
    </style>
@endpush

@section('content')
    <div class="card mb-3">
        <div class="card-body">
            <form action="{{route('admin.data.bank-soal.store')}}" method="post">
            @csrf
                <input type="text" class="input_tipe_pilihan" value="mulitple" name="tipe_pilihan" hidden>
                <div class="row">
                <div class="col-md-6 mb-3">
                    <div class="">
                        <label class="form-label">Soal</label>
                        <textarea class="form-control" required name="soal" data-bs-toggle="autosize" placeholder="Type something…" style="overflow: hidden; overflow-wrap: break-word; resize: none; text-align: start; height: 55.6px;"></textarea>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="">
                        <label class="form-label">Deskripsi/Notes <i>(optional)</i></label>
                        <textarea class="form-control" name="deskripsi" data-bs-toggle="autosize" placeholder="Type something…" style="overflow: hidden; overflow-wrap: break-word; resize: none; text-align: start; height: 55.6px;"></textarea>
                    </div>
                </div>
                </div>
                {{-- select type pilihan --}}
                <div class="card" id="pilihan_ganda">
                  <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs" role="tablist">
                      <li class="nav-item" role="presentation">
                        <a href="#tabs-home-1" class="nav-link active" tipe-pilihan="mulitple" data-bs-toggle="tab" aria-selected="true" role="tab">Form Custome</a>
                      </li>
                      <li class="nav-item" role="presentation">
                        <a href="#tabs-profile-1" class="nav-link" tipe-pilihan="ya_tidak" data-bs-toggle="tab" aria-selected="false" role="tab" tabindex="-1">Hanya Ya atau Tidak</a>
                      </li>
                      <li class="nav-item" role="presentation">
                        <a href="#essay" class="nav-link" tipe-pilihan="essay" data-bs-toggle="tab" aria-selected="false" role="tab" tabindex="-1">Essay</a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="tab-pane active show" id="tabs-home-1" role="tabpanel">
                        {{-- data pilihan ganda --}}
                        <div class="pilihan">
                            <div class="mb-3">
                                <label for="" class="form-label">Pilihan 1</label>
                                <input type="text" placeholder="" name="pilihan[0]" class="form-control">
                            </div>
                        </div>
                        <div class="text-center mt-3">
                            <div class="btn btn-outline-warning add_pilihan">Tambah Pilihan</div>
                        </div>
                        {{-- end data pilihan ganda --}}
                      </div>
                      <div class="tab-pane" id="tabs-profile-1" role="tabpanel">
                        <h4>Hanya Iya atau Tidak</h4>
                      </div>
                      <div class="tab-pane" id="essay" role="tabpanel">
                        <h4>Essay</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {{-- select type pilihan end --}}


                <div class="mt-5">
                    <button class="btn btn-warning">Simpan</button>
                </div>
            </form>
        </div>
    </div>

@endsection

@push('addScript')
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script>
        let i = 0;
        $(".add_pilihan").on("click", function(){
           i++;

           $(".pilihan").append(`
                <div class="mb-3">
                    <label for="" class="form-label">Pilihan ${i+1}</label>
                    <input type="text" placeholder="" required name="pilihan[${i}]" class="form-control">
               </div>
            `)
        });

        $("#pilihan_ganda .nav-link").on("click", function(){
            let tipe = $(this).attr("tipe-pilihan")

            $(".input_tipe_pilihan").val(tipe);
        })
    </script>
@endpush
