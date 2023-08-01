
<table class="table">
    <thead>
        <tr>
            <th scope="col" style="background-color: #FFFBDB; border: 1px solid #000000;" width="16">Responden</th>
            @foreach ($soal as $item)
                <th scope="col" style="background-color: #FFFBDB; border: 1px solid #000000;" width="16">{{$item->title}}</th>
            @endforeach
        </tr>
    </thead>
    <tbody>
        @foreach ($dataTarget as $responden)
        <tr>
                <th scope="row">{{$responden->nama}}</th>
                @foreach ($soal as $itemSoal)
                    @if ($itemSoal->yes_no && $responden->pilihanTarget->where('soal_id', $itemSoal->id)->first())
                        <td>{{$responden->pilihanTarget->where('soal_id', $itemSoal->id)->first()->yes_no}}</td>
                    @elseif ($responden->pilihanTarget->where('soal_id', $itemSoal->id)->first())

                        <td>{{$responden->pilihanTarget->first()->pilihan ? $responden->pilihanTarget->first()->pilihan->title : "-"}}</td>
                    @else
                        <td>-</td>
                    @endif
                @endforeach
            </tr>
        @endforeach
    </tbody>
</table>