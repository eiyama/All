<template>
  <div>
   <mt-header fixed class="def-header" title="组织机构代码查询">
    <div slot="left">
      <mt-button @click="isSeachOrgCode = false" icon="back"></mt-button>
    </div>
  </mt-header>
      <div v-for=" orgItem in orgCodeResult">
        <span>
          <p>公司名称</p>
          <p>{{orgItem.name}}</p>
        </span>
        <span>
          <p>组织机构代码</p>
          <p>{{orgItem.orgCode}}</p>
        </span>
        <span>
          <p>营业执照</p>
          <p>{{orgItem.creditCode}}</p>
        </span>
      </div>
    </div>
</template>

<script>
</script>

<style>
</style>
