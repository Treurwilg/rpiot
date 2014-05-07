<!DOCTYPE html>
<html>
<head>
  <title>Temperature measurements</title>
</head>
<body>
  <?php
    $db = new PDO("mysql:dbname=pi;host=localhost","root","GJdI8045");
    $rows = $db->query("select observationtime, temp_celsius from Temp1");
  ?>
  <table>
  <caption>Datetime temperature measurements</caption>
    <tr>
      <td>observationtime</td>
      <td>temp_celsius</td>
    </tr>
    <?php
      foreach ($rows as $row) { ?>
        <tr>
          <td><?= $row["observationtime"] ?></td>
          <td><?= $row["temp_celsius"] ?></td>
        </tr> <?php
      }
    ?>
  </table>
</body>
</html>


