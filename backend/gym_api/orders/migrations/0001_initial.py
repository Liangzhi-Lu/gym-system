# Generated by Django 3.2.11 on 2025-05-14 15:59

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MembershipPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='套餐名称')),
                ('plan_type', models.CharField(choices=[('monthly', '月卡'), ('quarterly', '季卡'), ('yearly', '年卡'), ('custom', '自定义')], max_length=20, verbose_name='套餐类型')),
                ('duration', models.IntegerField(verbose_name='有效期(天)')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='价格')),
                ('description', models.TextField(blank=True, null=True, verbose_name='套餐描述')),
                ('benefits', models.TextField(blank=True, null=True, verbose_name='套餐福利')),
                ('is_active', models.BooleanField(default=True, verbose_name='是否激活')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name': '会员套餐',
                'verbose_name_plural': '会员套餐',
                'db_table': 'gym_membership_plan',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_id', models.CharField(default=uuid.uuid4, editable=False, max_length=50, unique=True, verbose_name='订单号')),
                ('order_type', models.CharField(choices=[('membership', '会员套餐'), ('course', '课程'), ('product', '商品')], max_length=20, verbose_name='订单类型')),
                ('status', models.CharField(choices=[('pending', '待支付'), ('paid', '已支付'), ('cancelled', '已取消'), ('refunded', '已退款')], default='pending', max_length=20, verbose_name='订单状态')),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='订单总金额')),
                ('discount_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='优惠金额')),
                ('actual_amount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='实际支付金额')),
                ('payment_method', models.CharField(blank=True, choices=[('wechat', '微信支付'), ('alipay', '支付宝'), ('cash', '现金'), ('card', '银行卡')], max_length=20, null=True, verbose_name='支付方式')),
                ('payment_id', models.CharField(blank=True, max_length=100, null=True, verbose_name='支付交易号')),
                ('paid_at', models.DateTimeField(blank=True, null=True, verbose_name='支付时间')),
                ('remark', models.TextField(blank=True, null=True, verbose_name='备注')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name': '订单',
                'verbose_name_plural': '订单',
                'db_table': 'gym_order',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_name', models.CharField(max_length=200, verbose_name='商品名称')),
                ('item_price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='商品单价')),
                ('quantity', models.IntegerField(default=1, verbose_name='数量')),
                ('item_total', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='商品总价')),
                ('course', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='order_items', to='courses.course', verbose_name='课程')),
                ('membership_plan', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='order_items', to='orders.membershipplan', verbose_name='会员套餐')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='orders.order', verbose_name='订单')),
            ],
            options={
                'verbose_name': '订单项',
                'verbose_name_plural': '订单项',
                'db_table': 'gym_order_item',
            },
        ),
    ]
