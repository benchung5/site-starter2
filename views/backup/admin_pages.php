<?php 
// header
$this->insert('admin_header', $view_data );
?>

<section id="main">
  <div class="container">
    <div class="row">
      <div class="col-md-3">

        <?php 
        // header
        $this->insert('admin_side_nav', $view_data );
        ?>

      </div>
      <div class="col-md-9">
        <!-- Website Overview -->
        <div class="panel panel-default">
          <div class="panel-heading main-color-bg">
            <h3 class="panel-title">Pages</h3>
          </div>
          <div class="panel-body">
            <div class="row">
                  <div class="col-md-12">
                      <input class="form-control" type="text" placeholder="Filter Pages...">
                  </div>
            </div>
            <br>
            <table class="table table-striped table-hover">
                  <tr>
                    <th>Title</th>
                    <th>Published</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>Home</td>
                    <td><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></td>
                    <td>Dec 12, 2016</td>
                    <td><a class="btn btn-default" href="edit.html">Edit</a> <a class="btn btn-danger" href="#">Delete</a></td>
                  </tr>
                  <tr>
                    <td>About</td>
                    <td><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></td>
                    <td>Dec 13, 2016</td>
                    <td><a class="btn btn-default" href="edit.html">Edit</a> <a class="btn btn-danger" href="#">Delete</a></td>
                  </tr>
                  <tr>
                    <td>Services</td>
                    <td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td>
                    <td>Dec 13, 2016</td>
                    <td><a class="btn btn-default" href="edit.html">Edit</a> <a class="btn btn-danger" href="#">Delete</a></td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></td>
                    <td>Dec 14, 2016</td>
                    <td><a class="btn btn-default" href="edit.html">Edit</a> <a class="btn btn-danger" href="#">Delete</a></td>
                  </tr>
                </table>
          </div>
          </div>

      </div>
    </div>
  </div>
</section>

<?php 
// footer
$this->insert('admin_footer', $view_data );
?>

<?php 
// modals
$this->insert('admin_modals', $view_data );
?>