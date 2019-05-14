<%--
  Created by IntelliJ IDEA.
  User: yangpengbo
  Date: 2019/5/14
  Time: 8:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
  <head>
    <title>订单信息</title>
    <link href="./static/css/mainstyle.css" rel="stylesheet" type="text/css"/>
    <script src="script.js" type="text/javascript"></script>
  </head>
  <body onload="window_onload()">
    <section>
      <header id="div_head_title_big"><h1>编辑订单信息</h1></header>
      <form id="form1">
          <li>
              <ul>
                <li id="title1"><span>*</span><label for="tbxCode">订&nbsp;单&nbsp;编号</label> </li>
                <li id="content1">
                  <input type="text" id="tbxCode" name="tbxCode" maxlength="8" placeholder="必须输入一个不存在的订单编号" autofocus required/>
                </li>
                <li id="title2"><span>*</span><label for="tbxDate">订&nbsp;单日期</label></li>
                <li id="content2">
                  <input type="date" id="tbxDate" name="tbxDate" maxlength="10"  required/>
                </li>
                <li id="title3"><span>*</span><label for="tbxGoodsCode">商&nbsp;品编号</label></li>
                <li id="content3">
                  <input type="text" id="tbxGoodsCode" name="tbxGoodsCode" maxlength="12" placeholder="必须输入商品编号" autofocus required/>
                </li>
              </ul>
          </li>
          <li>
            <ul>
              <li id="title4"><label for="tbxBrandName">商&nbsp;&nbsp;&nbsp;&nbsp;标</label> </li>
              <li id="content4">
                <input type="text" id="tbxBrandName" name="tbxBrandName" maxlength="50"  />
              </li>
              <li id="title5"><span>*</span><label for="tbxNum">数&nbsp;&nbsp;&nbsp;量</label></li>
              <li id="content5">
                <input type="number" id="tbxNum" name="tbxNum" maxlength="6" placeholder="必须输入一个整数值"  required
                onblur="tbxNum_onblur();"/>
              </li>
              <li id="title6"><label for="tbxPrice">单&nbsp;&nbsp;&nbsp;价</label></li>
              <li id="content6">
                <input type="text" id="tbxPrice" name="tbxPrice" maxlength="6" value="0" placeholder="必须输入一个有效单价"
                 required onblur="tbxPrice_onblur();"/>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li id="title7"><label for="tbxMoney">金&nbsp;&nbsp;&nbsp;&nbsp;额</label> </li>
              <li id="content7">
                <input type="text" id="tbxMoney" name="tbxMoney" readonly="readonly" value="0"/>
              </li>
              <li id="title8"><span>*</span><label for="tbxPersonName">负&nbsp;责&nbsp;人</label></li>
              <li id="content8">
                <input type="text" id="tbxPersonName" name="tbxPersonName" maxlength="20" />
              </li>
              <li id="title9"><span>*</span><label for="tbxEmail">负责人Email</label></li>
              <li id="content9">
                <input type="email" id="tbxEmail" name="tbxEmail" maxlength="20" value="0" placeholder="请输入一个有效的邮件地址"/>
              </li>
            </ul>
          </li>

        <div id="buttonDiv">
          <input type="button" name="btnNew" id="btnNew" value="新增" onclick="btnNew_onclick();"/>
          <input type="submit" name="btnAdd" id="btnAdd" value="追加" formaction="javascript:btnAdd_onclick();"/>
          <input type="submit" name="btnUpdate" id="btnUpdate" value="修改" formaction="javascript:btnUpdate_onclick();"/>
          <input type="submit" name="btnDelete" id="btnDelete" value="删除" formaction="javascript:btnDelete_onclick();"/>
          <input type="submit" name="btnClear" id="btnClear" value="清除" formaction="javascript:btnClear_onclick();"/>
        </div>
      </form>
    </section>
    <section>
      <header id="div_head_title_detail"><h1>订单信息一览表</h1></header>
         <div id="infoTable">
           <table id="datatable">
             <tr>
               <th>订单编号</th>
               <th>订单日期</th>
               <th>商品编号</th>
               <th>商标</th>
               <th>数量</th>
               <th>单价</th>
               <th>金额</th>
               <th>负责人</th>
               <th>负责人Email</th>
             </tr>
           </table>
         </div>
    </section>
  </body>
</html>
