<?php
// header.php
include_once 'header-internal-menu-right.php';
?>


<div class="loading-container">
    <div data-stellar-vertical-offset="0" data-stellar-background-ratio="0.5" class="full-width-img full-width-img-internal plax-img">
        <div id="internal-header-grad">
            <div id="internal-page-header-wrapper">
                <div class="row">
                    <div class="medium-12 columns">
                        <h1 class="page-header internal-page-header textshadow">Internal Template</h1>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
    <div class="body-container">
        <div class="row">
            <div class="large-12 columns" id="content">
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
        </div>
        <div class="clear"></div>
    </div>
</div>
<?php
// footer.php
include_once 'footer.php';
?>