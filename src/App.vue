<template>
<div class="container-fluid">
  <h6 class="mt-3 ms-2">MYDATA.JSON</h6>

  <!-- *** Table *** -->
  <!-- Outer parent table - starting rows -->
  <table class="table">
    <thead style="background: #f3f3f8; border-width: 0px;">
      <tr class="d-flex">
        <th scope="col"> </th>
        <th scope="col" class="w-50">Identification number</th>
        <th scope="col" class="w-25">Name</th>
        <th scope="col" class="w-25">Gender</th>
        <th scope="col" class="w-25">Risk</th>
        <th scope="col" class="w-25">Hair length</th>
        <th scope="col" class="w-25">IQ</th>
        <th scope="col" class="w-50">Admission date</th>
        <th scope="col" class="w-50">Last breakdown</th>
        <th scope="col" class="w-25">Yearly fee</th>
        <th scope="col" class="w-50">Knows the Joker?</th>
        <th scope="col">&nbsp;&nbsp;</th>
      </tr>
    </thead>

    <!--display only parent table rows where index is smaller than user clicked row -->
    <tbody v-for="(parent, index) in unosMydata" :key="index" style="border-top: 0px;" @click="openRow(index, parent)">
      <tr v-if="ind == -1 || index <= ind" class="d-flex">
        <th scope="row" v-if="parent.kids.hasOwnProperty('has_relatives') == true">&#10093;</th>
        <th scope="row" v-if="parent.kids.hasOwnProperty('has_relatives') == false">&nbsp;</th>
        <td class="w-50">{{parent.data['Identification number']}}</td>
        <td class="w-25">{{parent.data.Name}}</td>
        <td class="w-25">{{parent.data.Gender}}</td>
        <td class="w-25">{{parent.data.Risk}}</td>
        <td class="w-25">{{parent.data['Hair length']}}</td>
        <td class="w-25">{{parent.data.IQ}}</td>
        <td class="w-50">{{parent.data['Admission date']}}</td>
        <td class="w-50">{{parent.data['Last breakdown']}}</td>
        <td class="w-25">{{parent.data['Yearly fee']}}</td>
        <td class="w-50">{{parent.data['Knows the Joker?']}}</td>
        <td @click="delParentRow(index)" style="cursor: pointer;"><b>&#120;</b>&nbsp;</td>
      </tr>
    </tbody>  
  </table>


  <!-- Inner first child table displayed upon click on the parent row -->
  <h6 class="mt-3 ms-4" v-if="child1.length && childRowOpened">HAS_RELATIVES</h6>
  <table v-if="(ind == openIndex && parentRowOpened) && child1.length" class="table" style="margin-left: 20px;">
    <thead style="background: #f3f3f8; border: 0px solid white;">
      <tr class="d-flex">
        <th scope="col"> </th>
        <th class="w-25">Relative ID</th>
        <th class="w-25">Patient ID</th>
        <th class="w-25">Is alive?</th>
        <th class="w-25">Frequency of visits</th>
      </tr>
    </thead>

    <tbody v-for="(childFirst, index) in child1" :key="index" style="border: 0px;" @click="openRowChild2(index, childFirst)">
      <tr class="d-flex mb-3" style="border: 0px solid gainsboro;">
        <th scope="row">&#10093;</th>
        <td class="w-25">{{ childFirst.data['Relative ID'] }}</td>
        <td class="w-25">{{ childFirst.data['Patient ID'] }}</td>
        <td class="w-25">{{ childFirst.data['Is alive?'] }}</td>
        <td class="w-25">{{ childFirst.data['Frequency of visits'] }}</td>
      </tr>
    </tbody>
  </table>
  
  
  <!-- Inner second child table displayed upon click on the child1 table row -->
  <h6 class="mt-3 ms-5" v-if="child2.length && childRowOpened">HAS_PHONE</h6>
  <table v-if="(childRowOpened) && child2.length" class="table" style="margin-left: 40px;">
    <thead style="background: #f3f3f8; border: 0px solid white;">
      <tr class="d-flex">
        <th scope="col"> </th>
        <th class="w-25">Phone ID</th>
        <th class="w-25">ID of the relative</th>
        <th class="w-25">Phone</th>
      </tr>
    </thead>

    <tbody v-for="(childSecond, index) in child2" :key="index" style="border: 0px;">
      <tr class="d-flex mb-3" style="border: 0px solid gainsboro;">
        <th scope="row">&nbsp;</th>
        <td class="w-25">{{ childSecond.data['Phone ID'] }}</td>
        <td class="w-25">{{ childSecond.data['ID of the relative'] }}</td>
        <td class="w-25">{{ childSecond.data['Phone'] }}</td>
      </tr>
    </tbody>
  </table>


  <!-- Outer parent table - remaining rows displayed after inner child table -->
  <table class="table">
    <!--display only outer parent table rows where index is smaller than user-clicked row -->
    <tbody v-for="(parent, index) in unosMydata" :key="index" style="border-top: 0px;" @click="openRow(index, parent)">
      <tr v-if="ind !== -1 && index > ind" class="d-flex">
        <th scope="row" v-if="parent.kids.hasOwnProperty('has_relatives') == true">&#10093;</th>
        <th scope="row" v-else>&nbsp;</th>
        <td class="w-50">{{parent.data['Identification number']}}</td>
        <td class="w-25">{{parent.data.Name}}</td>
        <td class="w-25">{{parent.data.Gender}}</td>
        <td class="w-25">{{parent.data.Risk}}</td>
        <td class="w-25">{{parent.data['Hair length']}}</td>
        <td class="w-25">{{parent.data.IQ}}</td>
        <td class="w-50">{{parent.data['Admission date']}}</td>
        <td class="w-50">{{parent.data['Last breakdown']}}</td>
        <td class="w-25">{{parent.data['Yearly fee']}}</td>
        <td class="w-50" @click="delParentRow(index)">{{parent.data['Knows the Joker?']}}</td>
      </tr>
    </tbody>  
  </table>

</div> <!-- End of container div -->
</template>


<script lang="ts">
import { defineComponent } from 'vue'; // needed for ts + Vue options API with Vue3
import { Mydata } from './interfaces/tablerow';  // here we import interface
import { myData } from './services';  // .json file with data fetched in service file

export default defineComponent({
  name: 'app',
  data() {
    return {
      unosMydata: myData as Mydata[],  // direct entry of the json file
      openIndex: -1 as number,  // index of a clicked parent table row
      parentRowOpened: false as boolean,  // detect if user has clicked to open or close parent row
      ind: -1 as number,  // record index of clicked parent row for opening child table
      child1: [] as any[],  // child1 data for the clicked parent row
      child2: [] as any[],  // child2 phone data for the clicked parent table row
      openIndexChild: -1 as number,  // index of a clicked child1 table row 
      childRowOpened: false as boolean,  // detect if child1 row was opened
      ind2: -1 as number // record index of clicked child1 row for opening child2 table
    }
  },
  methods: {
    delParentRow(i: number) {  // deleting parent table row upon click
      setTimeout(() => { // we trigger this delayed from the event loop, after main stack thus openRow() is executed, so that we can close all child items..
        this.unosMydata.splice(i, 1);  // since user clicked on the row with two different click events
        this.parentRowOpened = false;
        this.childRowOpened = false;
        this.openIndex = -1;
        this.openIndexChild = -1;
        this.ind = -1;
        this.ind2 = -1;
      }, 10);
    },
    openRow(i: any, parent: any) {  // record index of parent table row where user has clicked && define whether child table should be opened or closed
      if (parent.kids.hasOwnProperty('has_relatives')) { // store only if parent.kids object have 'has_relatives' key
        this.child1 = parent.kids['has_relatives'].records;
      } else {
        this.child1 = []; // otherwise empty child1 that may contain data stored from the some previous action
      }
      this.childRowOpened = false;
      /* 
        In case another parent table row is opened and we click on the row that has no child data we have to reset opening table row variables,
        otherwise Bootstrap 5 table may display small vertical space below the previously opened parent table row 
      */
      if (this.child1.length === 0) {
        this.parentRowOpened = false;
        this.ind = -1;
      }

      // if the child table has data open child table
      if (this.child1.length > 0) {

        if (this.openIndex === -1) {  // initial parent table row opening upon click
          this.openIndex = i;
        }
        this.ind = i;  // flag for separation of parent rows above and below child1 table upon click on the parent row

        if (this.parentRowOpened === false) { // if parent table row was closed open it
          this.parentRowOpened  = !this.parentRowOpened;
          this.childRowOpened = false;  // we have to close opened child2 table rows too
        } else if (this.openIndex === i && this.parentRowOpened === true) {  // if clicked on another parent row close former one
          this.parentRowOpened = false;
          this.ind = -1;
          this.child1 = [];
        } 
        this.openIndex = i;  // position this code set at the end of the method in order to not interfere with the if-else states 
      }  // end of child1.length if
    },
    openRowChild2(i: any, childFirst: any) {  // opening child2 row
      if (childFirst.kids.hasOwnProperty('has_phone')) { // store only if child1.kids object have 'has_phone' key
        this.child2 = childFirst.kids.has_phone.records;
      } else {
        this.child2 = []; // otherwise empty child1 that may contain data stored from the some previous action
      }

      if (this.child2.length === 0) {
        this.childRowOpened = false;
      }

      // if the child table has data open child table
      if (this.child2.length > 0) {

        if (this.openIndexChild === -1) {  // initial parent table row opening upon click
          this.openIndexChild = i;
        }

        if (this.childRowOpened === false) { // if child table row was closed open it
          this.childRowOpened  = !this.childRowOpened;
        } else if (this.openIndexChild === i && this.childRowOpened === true) {  // if clicked on another parent row close former one
          this.childRowOpened = false;
          this.child2 = [];
        } 
        this.openIndexChild = i;  // position this code set at the end of the method in order to not interfere with the if-else states

      } 
    
    }
  }
});

</script>

<style>

</style>
