<template>
	<div class="table-responsive m-2 rounded" style="height: 90%">
		<table class="plan-table table-sm">
			<thead>
				<tr class="text-center">
					<th scope="col" class="plan-header"></th>
					<th @click="e => selectDay(e, 0)" scope="col" class="plan-header h1">Poniedziałek</th>
					<th @click="e => selectDay(e, 1)" scope="col" class="plan-header h1">Wtorek</th>
					<th @click="e => selectDay(e, 2)" scope="col" class="plan-header h1">Środa</th>
					<th @click="e => selectDay(e, 3)" scope="col" class="plan-header h1">Czwartek</th>
					<th @click="e => selectDay(e, 4)" scope="col" class="plan-header h1">Piątek</th>
				</tr>
			</thead>
			<tbody>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							0 <br />7<sup>10</sup>-7<sup>55</sup> <br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 5 min</span>
						</p>
					</th>
					<td>Wychowanie fizyczne</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							1 <br />8<sup>00</sup>-8<sup>45</sup> <br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 10 min</span>
						</p>
					</th>
					<td>Aplikacje internetowe</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							2 <br />8<sup>55</sup>-9<sup>40</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 10 min</span>
						</p>
					</th>
					<td>Aplikacje internetowe</td>
					<td></td>
					<td></td>
					<td>Systemy baz danych</td>
					<td></td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							3 <br />9<sup>50</sup>-10<sup>35</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 10 min</span>
						</p>
					</th>
					<td>Witryny internetowe</td>
					<td></td>
					<td>Język polski</td>
					<td>Systemy baz danych</td>
					<td>Religia</td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							4 <br />10<sup>45</sup>-11<sup>30</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 15 min</span>
						</p>
					</th>
					<td>Język polski</td>
					<td></td>
					<td>Język polski</td>
					<td>Religia</td>
					<td>Język angielski</td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							5 <br />11<sup>45</sup>-12<sup>30</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"> </i
							><span class="break-minutes" title="długość przerwy"> 10 min</span>
						</p>
					</th>
					<td>Wychowanie fizyczne</td>
					<td>Matematyka rozszerzona</td>
					<td>Matematyka rozszerzona</td>
					<td>Wychowanie fizyczne</td>
					<td>Język niemiecki</td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							6 <br />12<sup>40</sup>-13<sup>25</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i
							><span class="break-minutes" title="długość przerwy"> 5 min</span>
						</p>
					</th>
					<td>Zajęcia z wychowawcą</td>
					<td>Matematyka rozszerzona</td>
					<td>Matematyka rozszerzona</td>
					<td>Informatyka rozszerzona</td>
					<td>Systemy baz danych</td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							7 <br />13<sup>30</sup>-14<sup>15</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 5 min</span>
						</p>
					</th>
					<td>Język angielski zawodowy</td>
					<td>Podstawy przedsiębiorczości</td>
					<td>Projektowanie i montaż lokalnych sieci komputerowych</td>
					<td>Administracja bazami danych</td>
					<td>Systemy baz danych</td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							8 <br />14<sup>20</sup>-15<sup>05</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 5 min</span>
						</p>
					</th>
					<td></td>
					<td>Sieciowe systemy operacyjne</td>
					<td>Projektowanie i montaż lokalnych sieci komputerowych</td>
					<td>Administracja bazami danych</td>
					<td>Informatyka rozszerzona</td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							9 <br />15<sup>10</sup>-15<sup>55</sup> <br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 5 min</span>
						</p>
					</th>
					<td></td>
					<td>Diagnostyka i naprawa urządzeń techniki komputerowej</td>
					<td></td>
					<td>Administracja bazami danych</td>
					<td></td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							10 <br />16<sup>00</sup>-16<sup>45</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 5 min</span>
						</p>
					</th>
					<td></td>
					<td>Tworzenie aplikacji internetowych</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							11 <br />16<sup>50</sup>-17<sup>35</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 5 min</span>
						</p>
					</th>
					<td></td>
					<td>Tworzenie aplikacji internetowych</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							12 <br />17<sup>40</sup>-18<sup>25</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 5 min</span>
						</p>
					</th>
					<td></td>
					<td>Sieci komputerowe</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr class="plan-row text-center">
					<th scope="row" class="text-start" style="border-bottom: 1px solid var(--bg-400)">
						<p class="abc mb-auto text-center lh-1">
							13 <br />18<sup>30</sup>-19<sup>15</sup><br />
							<i style="font-size: 10px" class="pi pi-clock break-minutes" title="długość przerwy"></i>
							<span class="break-minutes" title="długość przerwy"> 5 min</span>
						</p>
					</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import selectDay from '../composables/selectDay';
</script>
