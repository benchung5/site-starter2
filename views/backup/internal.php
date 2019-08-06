<?php
// header.php
include_once 'header.php';
?>

<div class="loading-container">
    <div class="body-container">
        <div class="row">
            <div class="large-8 columns" id="content">
                <!--content-->
                <?php
                //include_once 'temp-columns.php';
                //include_once 'temp-typography.php';
                //include_once 'temp-buttons.php';
                //include_once 'temp-dividers.php';
                //include_once 'temp-elements.php';
                //include_once 'temp-forms.php';
                include_once 'temp-piecms.php';
                ?>
                <!--end content-->
            </div>
            <div class="large-4 columns" id="sidebar">
                <!--sidebar-->
                <?php
                include_once 'sidebar.php';
                ?>
                <!--end sidebar-->
            </div>
        </div>
        <div class="clear"></div>
    </div>
</div>

<?php
// footer.php
include_once 'footer.php';
?>