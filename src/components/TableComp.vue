<template>
  <div class="wrapTable">
    <table class="table">
      <caption class="table__caption_bg">
        <div class="table__caption_title">
          <span>
            <slot></slot>
          </span>
          <span>
            <slot></slot>
          </span>
          <span>
            <slot></slot>
          </span>
          <span>
            <slot></slot>
          </span>
          
        </div>


      </caption>
      <thead class="table__thead">
        <tr class="table-row">
          <th class="table-row__th">Price</th>
          <th class="table-row__th">Ammount</th>
          <th class="table-row__th table-row__th-total_hide">Total</th>
        </tr>
      </thead>
      <tbody class="table__tbody">
        <tr class="table-row" v-for="(item, index) in items" :key="index">
          <td class="table-row__td">{{ item[0] }}</td>
          <td class="table-row__td">{{ item[1] }}</td>
          <td class="table-row__td table-row__td-total_hide">
            {{ item[0] * item[1] }}
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: "TableComp",
  props: ["items"]
};
</script>

<style lang="scss" scoped>
.wrapTable {
  height: calc(100vh - 125px);
  overflow-y: auto;
  overflow-x: hidden;
  background: rgb(217, 223, 217);
  border: 1px solid rgb(86, 86, 201);
  color: rgb(86, 86, 201);
  transition: all .3s;
  border-radius: 10px;
  padding-left: 10px;
  
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgb(86, 86, 201);
    border-radius: 3px;
    opacity: 1;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  .table {
    width: 100%;
  }

  .table__caption_bg {
    
   width: 100%;
   overflow: hidden;

    .table__caption_title {
      display: flex;
      width: 200%;
      animation: actionText 3s linear infinite;
      span {
        font-size: 30px;
        font-style: italic;
        display: inline-block;
        width: 33%;
        color: rgb(86, 86, 201);
        font-weight: 600;

      }
    }
  }

  .table-row__th {
    font-size: 15px;
    font-weight: 600;
    text-shadow: 0 0 3px white;
  }


  .table-row__td {
    font-size: 12px;
    
  }

}


@keyframes actionText {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0%);
  }
}
</style>
