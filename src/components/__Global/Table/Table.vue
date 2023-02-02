<template>
  <div>
    <div class="search-table">
      <InputComponent label="Buscar" width="300px" v-model="searchInput" />
      <Button @click="search">Ok</Button>
      <!-- <Button @click="refresh">🗑</Button> -->
      <!-- <button @click="search">Search</button> -->
      <!-- <button @click="refresh">🗑</button> -->
    </div>

    <div class="nav-buttons">
      <slot name="nav-buttons"></slot>
    </div>

    <div class="search-result" v-if="searchMode">
      <b>🔍 Resultados encontrados:</b> {{ searchResult.length }}
      <p><Button @click="refresh">Limpar Resultado</Button></p>
    </div>

    <div class="search-result" v-if="this.copiedTable.length === 0">
      Ops, sua busca não teve nenhum resultado :(
    </div>

    <!-- Inicio Interface Tabela -->
    <div v-else class="hideInMobile">
      <table @mouseout="mouseHoverSort = ''">
        <thead>
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              :style="
                header.width
                  ? `width: ${header.width}`
                  : `width: ${100 / headers.length}%`
              "
            >
              <span
                v-if="header.sort"
                class="no-select"
                :style="header.sort && 'cursor: pointer'"
                @click="sortByColumn(header.value)"
                @mouseenter="mouseHoverSort = index"
              >
                {{ `${header.label}` }}
                <span
                  v-if="
                    (header.sort && mouseHoverSort === index) ||
                    sortType === header.value
                  "
                  >⬆</span
                >
              </span>
              <span v-else>{{ header.label }}</span>
            </th>
          </tr>
        </thead>
      </table>
    </div>

    <div class="hideInMobile">
      <table>
        <tbody>
          <tr
            v-for="item in copiedTable"
            :key="item.id"
            :style="
              item[checkAttributeName] && `background-color: ${checkedColor}`
            "
          >
            <td
              :style="
                header.width
                  ? `width: ${header.width}`
                  : `width: ${100 / (headers.length + 1)}%`
              "
              v-for="(header, index) in headers"
              :key="index"
            >
              <slot :name="header.value" :item="item">{{
                item[header.value]
              }}</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Fim Interface Tabela -->

    <!-- mobile LAYOUT -->
    <div class="table-mobile-breakpoint">
      <div class="mobile-card" v-for="item in copiedTable" :key="item.id">
        <div
          v-for="(header, index) in headers"
          class="mobile-card-inside"
          :style="
            item[checkAttributeName] && `background-color: ${checkedColor}`
          "
          :key="index"
        >
          <b>{{ header.label }}:</b>
          <slot :name="header.value" :item="item">{{
            item[header.value]
          }}</slot>
        </div>
        <hr />
      </div>
    </div>
    <!-- Fim mobile Layout -->

    <div class="pagination" v-if="copiedTable.length > 0">
      <b>Ir para: </b>
      <span @click="backward">«</span>
      <span
        v-for="(label, index) in pagesLabelNav"
        :key="index"
        @click="changePage(label)"
      >
        <span
          v-if="label !== '...'"
          class="pagination-nav"
          :style="actualPage === label && 'font-weight: 700'"
        >
          {{ label }}
        </span>
        <span v-if="label !== pagesLabelNav[pagesLabelNav.length - 1]">/</span>
      </span>
      <span @click="forward">»</span>
      <p><b>Página:</b> {{ actualPage }} de {{ numberOfPages }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentsTable',
  props: {
    headers: {
      type: Array,
      default: () => {
        return [];
      },
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    maxPerPage: { type: Number, default: 10 },
    maxPagesPagination: { type: Number, default: 20 },
    checkAttributeName: { type: String, default: 'checked' },
    checkedColor: { type: String, default: 'yellow' },
    mobileBreakPoint: { type: String, default: '800px' },
  },

  data: () => ({
    copiedTable: [],
    actualPage: 1,
    numberOfPages: 1,
    pagesLabelNav: [],
    searchInput: '',
    searchMode: false,
    searchResult: [],
    mouseHoverSort: '',
    sortType: '',
  }),

  computed: {
    showNumberOfPages() {
      const pages = Math.ceil(this.data.length / this.maxPerPage);
      return pages;
    },
  },

  created() {
    this.copiedTable = [...this.data];
    this.changePage(this.actualPage);
    this.showNumberPages(this.showNumberOfPages);
  },

  watch: {
    /*Observando o prop: data */
    data: {
      handler() {
        this.copiedTable = [...this.data];
        this.changePage(this.actualPage);
        this.showNumberPages(this.showNumberOfPages);
        if (this.searchMode) this.search();
      },
      deep: true,
    },

    /*Observando o numero da página, quando muda atualiza o que exibe na tela */
    numberOfPages() {
      if (this.actualPage > this.numberOfPages && this.numberOfPages > 0) {
        this.actualPage = this.numberOfPages;
        this.copiedTable = this.showItensPerPage(this.data);
      }
    },

    /*Observando a página atual para mudar a paginação se necessário */
    actualPage() {
      if (!this.pagesLabelNav.includes(this.actualPage))
        this.showNumberPages(this.showNumberOfPages);
    },
  },

  methods: {
    /* Retorna uma array de acordo com o maximo de resultados por página */
    showItensPerPage(items) {
      let content = [];
      this.numberOfPages = Math.ceil(items.length / this.maxPerPage);
      let count = this.actualPage * this.maxPerPage - this.maxPerPage;
      let delimiter = count + this.maxPerPage;

      if (this.actualPage <= this.numberOfPages) {
        for (let i = count; i < delimiter; i++) {
          items[i] && content.push(items[i]);
          items[i] && count++;
        }
      }

      return content;
    },

    /* Gera a paginação */
    showNumberPages(numberOfPage) {
      let pages = [];

      if (this.actualPage === 1) {
        for (let i = this.actualPage; i <= numberOfPage; i++) {
          if (i < this.maxPagesPagination + this.actualPage) pages.push(i);
        }
        this.pagesLabelNav = pages;
      } else {
        //Muda a paginação
        for (let i = 0; i < this.maxPagesPagination; i++) {
          if (this.actualPage + i <= numberOfPage)
            pages.push(this.actualPage + i);
        }
        this.pagesLabelNav = pages;

        let difference = this.maxPagesPagination - pages.length;
        if (difference > 0) {
          let arrayDifference = [];
          for (let i = 1; i <= difference; i++) {
            arrayDifference.push(pages[0] - i);
          }
          this.pagesLabelNav = [...arrayDifference, ...pages].sort(
            (a, b) => a - b
          );
        }
      }
    },

    /*Muda a página e exibe o novo resultado na tela referente a página especifica */
    changePage(pageNumber) {
      if (typeof pageNumber === 'number' && !this.searchMode) {
        this.actualPage = pageNumber;
        this.copiedTable = this.showItensPerPage(this.data);
      }

      if (typeof pageNumber === 'number' && this.searchMode) {
        this.actualPage = pageNumber;
        this.copiedTable = this.showItensPerPage(this.searchResult);
      }
    },

    backward() {
      // let page = this.actualPage - this.maxPagesPagination;
      let page = this.pagesLabelNav[0] - this.maxPagesPagination;
      if (page <= 0) page = 1;
      page > 0 && this.changePage(page);
    },

    forward() {
      let page = this.pagesLabelNav[this.pagesLabelNav.length - 1] + 1;
      if (page > this.numberOfPages)
        page = this.pagesLabelNav[this.pagesLabelNav.length - 1];
      page <= this.numberOfPages && this.changePage(page);
    },

    /* Executa a procura dentro da array */
    search() {
      this.searchMode = true;
      const ignore = this.headers.map((item) => item.value);

      if (
        this.searchInput.length === 0 ||
        this.searchInput === ' ' ||
        ignore.includes(this.searchInput)
      ) {
        this.noSearchResult();
        return;
      }

      const result = this.data.filter((item) => {
        let check = JSON.stringify(item).toLowerCase();
        if (check.includes(this.searchInput)) return item;
      });

      this.searchResult = result;

      this.actualPage = 1;
      this.copiedTable = this.showItensPerPage(this.searchResult);
      this.showNumberPages(
        Math.ceil(this.searchResult.length / this.maxPerPage)
      );
    },

    /* Resultado não encontrado */
    noSearchResult() {
      this.copiedTable = [];
      this.searchResult = [];
      this.actualPage = 1;
      this.numberOfPages = 1;
      this.showNumberPages(
        Math.ceil(this.copiedTable.length / this.maxPerPage)
      );
    },

    /* Limpa a busca e retorna os dados iniciais da Array passada pela prop :data */
    refresh() {
      this.copiedTable = this.showItensPerPage(this.data);
      this.showNumberPages(this.showNumberOfPages);
      this.searchMode = false;
      this.actualPage = 1;
      this.searchInput = '';
      this.sortType = '';
    },

    /* Sort por ordem alfabética/numerica */
    sortByColumn(value) {
      if (this.sortType === value) {
        this.sortType = '';
        this.copiedTable = this.showItensPerPage(this.data);
        return;
      }

      if (typeof value === 'number')
        this.copiedTable = this.copiedTable.sort((a, b) => a[value] - b[value]);

      if (typeof value === 'string')
        this.copiedTable = this.copiedTable.sort((a, b) => {
          if (a[value] < b[value]) return -1;
          if (a[value] > b[value]) return 1;
          return 0;
        });

      this.sortType = value;
    },
  },
};
</script>

<style src="./Table.less" scoped />
