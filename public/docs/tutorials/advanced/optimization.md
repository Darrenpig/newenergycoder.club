---
title: "系统性能优化"
description: "深入学习新能源系统的性能优化技术，包括算法优化、内存管理、并发处理和系统调优。"
author: "新能源编程俱乐部"
date: "2024-01-15"
tags: ["性能优化", "算法优化", "系统调优", "并发编程"]
category: "tutorials"
subcategory: "advanced"
slug: "optimization"
order: 1
toc: true
estimated_time: "180分钟"
difficulty: "advanced"
prerequisites: ["编程基础", "数据结构", "操作系统原理"]
---

# 系统性能优化

在新能源系统开发中，性能优化是确保系统稳定运行和高效处理的关键技术。本教程将深入探讨各种优化技术和最佳实践。

## ⏱️ 学习时间
**180分钟** | 难度：⭐⭐⭐⭐⭐

## 🎯 学习目标

完成本教程后，您将能够：

- [ ] 理解性能优化的基本原理和方法论
- [ ] 掌握算法和数据结构优化技术
- [ ] 实现高效的内存管理策略
- [ ] 应用并发和异步编程技术
- [ ] 进行系统级性能调优
- [ ] 使用性能分析和监控工具
- [ ] 优化新能源数据处理系统

## 📊 性能优化概述

### 优化层次

```
应用层优化
├── 算法优化
├── 数据结构优化
├── 代码优化
└── 架构优化

系统层优化
├── 内存管理
├── I/O优化
├── 并发处理
└── 缓存策略

硬件层优化
├── CPU优化
├── 内存优化
├── 存储优化
└── 网络优化
```

### 性能指标

- **响应时间**：系统处理请求的时间
- **吞吐量**：单位时间内处理的请求数量
- **资源利用率**：CPU、内存、磁盘、网络的使用效率
- **并发能力**：同时处理多个任务的能力
- **可扩展性**：系统处理负载增长的能力

## 🧮 算法优化

### 时间复杂度优化

#### 示例：太阳能功率预测算法优化

**原始实现（O(n²)）**：
```python
def predict_solar_power_naive(historical_data, weather_data):
    """
    朴素的太阳能功率预测算法
    时间复杂度：O(n²)
    """
    predictions = []
    
    for i, current_weather in enumerate(weather_data):
        # 对每个预测点，遍历所有历史数据寻找相似天气
        similar_powers = []
        
        for j, historical_point in enumerate(historical_data):
            # 计算天气相似度
            similarity = calculate_weather_similarity(
                current_weather, 
                historical_point['weather']
            )
            
            if similarity > 0.8:  # 相似度阈值
                similar_powers.append(historical_point['power'])
        
        # 预测功率为相似天气下的平均功率
        if similar_powers:
            predicted_power = sum(similar_powers) / len(similar_powers)
        else:
            predicted_power = 0
            
        predictions.append(predicted_power)
    
    return predictions

def calculate_weather_similarity(weather1, weather2):
    """
    计算天气相似度
    """
    # 简化的相似度计算
    temp_diff = abs(weather1['temperature'] - weather2['temperature'])
    humidity_diff = abs(weather1['humidity'] - weather2['humidity'])
    cloud_diff = abs(weather1['cloud_cover'] - weather2['cloud_cover'])
    
    # 归一化相似度
    similarity = 1 - (temp_diff / 50 + humidity_diff / 100 + cloud_diff / 100) / 3
    return max(0, similarity)
```

**优化实现（O(n log n)）**：
```python
import numpy as np
from sklearn.neighbors import KDTree
from sklearn.preprocessing import StandardScaler

class OptimizedSolarPredictor:
    def __init__(self):
        self.kdtree = None
        self.scaler = StandardScaler()
        self.historical_powers = None
        
    def fit(self, historical_data):
        """
        训练预测模型
        时间复杂度：O(n log n)
        """
        # 提取天气特征
        weather_features = np.array([
            [point['weather']['temperature'],
             point['weather']['humidity'],
             point['weather']['cloud_cover'],
             point['weather']['wind_speed']]
            for point in historical_data
        ])
        
        # 标准化特征
        weather_features_scaled = self.scaler.fit_transform(weather_features)
        
        # 构建KD树用于快速最近邻搜索
        self.kdtree = KDTree(weather_features_scaled)
        
        # 保存对应的功率值
        self.historical_powers = np.array([
            point['power'] for point in historical_data
        ])
        
    def predict(self, weather_data, k=5):
        """
        预测太阳能功率
        时间复杂度：O(m log n)，其中m是预测点数，n是历史数据点数
        """
        # 提取天气特征
        weather_features = np.array([
            [weather['temperature'],
             weather['humidity'],
             weather['cloud_cover'],
             weather['wind_speed']]
            for weather in weather_data
        ])
        
        # 标准化特征
        weather_features_scaled = self.scaler.transform(weather_features)
        
        # 查找k个最近邻
        distances, indices = self.kdtree.query(
            weather_features_scaled, k=k
        )
        
        predictions = []
        for i in range(len(weather_data)):
            # 基于距离的加权平均
            weights = 1 / (distances[i] + 1e-8)  # 避免除零
            weights = weights / np.sum(weights)  # 归一化权重
            
            # 加权平均预测
            predicted_power = np.sum(
                self.historical_powers[indices[i]] * weights
            )
            predictions.append(predicted_power)
            
        return predictions

# 使用示例
predictor = OptimizedSolarPredictor()
predictor.fit(historical_data)
predictions = predictor.predict(weather_data)
```

### 空间复杂度优化

#### 流式数据处理

```python
class StreamingSolarDataProcessor:
    """
    流式处理太阳能数据，减少内存占用
    """
    def __init__(self, window_size=1000):
        self.window_size = window_size
        self.data_buffer = []
        self.statistics = {
            'count': 0,
            'sum': 0,
            'sum_squares': 0,
            'min': float('inf'),
            'max': float('-inf')
        }
        
    def process_data_point(self, power_value):
        """
        处理单个数据点，维持固定大小的滑动窗口
        空间复杂度：O(window_size)
        """
        # 添加新数据点
        self.data_buffer.append(power_value)
        
        # 更新统计信息
        self.statistics['count'] += 1
        self.statistics['sum'] += power_value
        self.statistics['sum_squares'] += power_value ** 2
        self.statistics['min'] = min(self.statistics['min'], power_value)
        self.statistics['max'] = max(self.statistics['max'], power_value)
        
        # 维持窗口大小
        if len(self.data_buffer) > self.window_size:
            old_value = self.data_buffer.pop(0)
            
            # 更新统计信息（移除旧值的影响）
            self.statistics['sum'] -= old_value
            self.statistics['sum_squares'] -= old_value ** 2
            
            # 重新计算min和max（如果需要）
            if old_value == self.statistics['min'] or old_value == self.statistics['max']:
                self.statistics['min'] = min(self.data_buffer)
                self.statistics['max'] = max(self.data_buffer)
                
    def get_statistics(self):
        """
        获取当前窗口的统计信息
        """
        if not self.data_buffer:
            return None
            
        n = len(self.data_buffer)
        mean = self.statistics['sum'] / n
        variance = (self.statistics['sum_squares'] / n) - (mean ** 2)
        std_dev = variance ** 0.5
        
        return {
            'count': n,
            'mean': mean,
            'std_dev': std_dev,
            'min': self.statistics['min'],
            'max': self.statistics['max'],
            'current_window': self.data_buffer.copy()
        }
```

## 🧠 内存管理优化

### 对象池模式

```python
class SensorDataPool:
    """
    传感器数据对象池，减少频繁的对象创建和销毁
    """
    def __init__(self, initial_size=100):
        self.available_objects = []
        self.in_use_objects = set()
        
        # 预创建对象
        for _ in range(initial_size):
            self.available_objects.append(SensorData())
            
    def acquire(self):
        """
        获取一个对象
        """
        if self.available_objects:
            obj = self.available_objects.pop()
        else:
            # 池中没有可用对象，创建新对象
            obj = SensorData()
            
        self.in_use_objects.add(obj)
        return obj
        
    def release(self, obj):
        """
        释放对象回池中
        """
        if obj in self.in_use_objects:
            self.in_use_objects.remove(obj)
            obj.reset()  # 重置对象状态
            self.available_objects.append(obj)
            
    def get_pool_status(self):
        """
        获取对象池状态
        """
        return {
            'available': len(self.available_objects),
            'in_use': len(self.in_use_objects),
            'total': len(self.available_objects) + len(self.in_use_objects)
        }

class SensorData:
    """
    传感器数据类
    """
    def __init__(self):
        self.reset()
        
    def reset(self):
        """
        重置对象状态
        """
        self.timestamp = None
        self.sensor_id = None
        self.temperature = 0.0
        self.humidity = 0.0
        self.solar_irradiance = 0.0
        self.power_output = 0.0
        
    def set_data(self, timestamp, sensor_id, temperature, 
                 humidity, solar_irradiance, power_output):
        """
        设置数据
        """
        self.timestamp = timestamp
        self.sensor_id = sensor_id
        self.temperature = temperature
        self.humidity = humidity
        self.solar_irradiance = solar_irradiance
        self.power_output = power_output

# 使用示例
sensor_pool = SensorDataPool()

# 处理大量传感器数据
for data_point in large_dataset:
    # 从池中获取对象
    sensor_obj = sensor_pool.acquire()
    
    # 设置数据
    sensor_obj.set_data(
        data_point['timestamp'],
        data_point['sensor_id'],
        data_point['temperature'],
        data_point['humidity'],
        data_point['solar_irradiance'],
        data_point['power_output']
    )
    
    # 处理数据
    process_sensor_data(sensor_obj)
    
    # 释放对象回池中
    sensor_pool.release(sensor_obj)
```

### 内存映射文件

```python
import mmap
import struct
import os

class MemoryMappedDataStore:
    """
    使用内存映射文件处理大型数据集
    """
    def __init__(self, filename, record_size=32, max_records=1000000):
        self.filename = filename
        self.record_size = record_size  # 每条记录的字节数
        self.max_records = max_records
        self.file_size = record_size * max_records
        
        # 创建或打开文件
        if not os.path.exists(filename):
            with open(filename, 'wb') as f:
                f.write(b'\x00' * self.file_size)
                
        self.file = open(filename, 'r+b')
        self.mmap = mmap.mmap(self.file.fileno(), 0)
        
    def write_record(self, index, timestamp, sensor_id, 
                    temperature, humidity, power):
        """
        写入一条记录
        """
        if index >= self.max_records:
            raise IndexError("Record index out of range")
            
        offset = index * self.record_size
        
        # 打包数据（使用struct格式）
        data = struct.pack('dIffff', 
                          timestamp,    # double (8 bytes)
                          sensor_id,    # unsigned int (4 bytes)
                          temperature,  # float (4 bytes)
                          humidity,     # float (4 bytes)
                          power,        # float (4 bytes)
                          0.0)          # padding (4 bytes)
        
        self.mmap[offset:offset + self.record_size] = data
        
    def read_record(self, index):
        """
        读取一条记录
        """
        if index >= self.max_records:
            raise IndexError("Record index out of range")
            
        offset = index * self.record_size
        data = self.mmap[offset:offset + self.record_size]
        
        # 解包数据
        timestamp, sensor_id, temperature, humidity, power, _ = \
            struct.unpack('dIffff', data)
            
        return {
            'timestamp': timestamp,
            'sensor_id': sensor_id,
            'temperature': temperature,
            'humidity': humidity,
            'power': power
        }
        
    def batch_read(self, start_index, count):
        """
        批量读取记录
        """
        records = []
        for i in range(start_index, min(start_index + count, self.max_records)):
            records.append(self.read_record(i))
        return records
        
    def close(self):
        """
        关闭文件
        """
        self.mmap.close()
        self.file.close()
        
    def __enter__(self):
        return self
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()

# 使用示例
with MemoryMappedDataStore('solar_data.dat') as store:
    # 写入数据
    for i in range(10000):
        store.write_record(i, time.time(), i % 100, 
                          25.0 + i * 0.01, 60.0 + i * 0.001, 
                          1000 + i * 0.1)
    
    # 读取数据
    records = store.batch_read(0, 100)
    for record in records:
        print(f"Sensor {record['sensor_id']}: {record['power']}W")
```

## ⚡ 并发和异步优化

### 多线程数据处理

```python
import threading
import queue
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

class ConcurrentDataProcessor:
    """
    并发数据处理器
    """
    def __init__(self, num_workers=4):
        self.num_workers = num_workers
        self.input_queue = queue.Queue()
        self.output_queue = queue.Queue()
        self.workers = []
        self.running = False
        
    def start(self):
        """
        启动工作线程
        """
        self.running = True
        
        for i in range(self.num_workers):
            worker = threading.Thread(
                target=self._worker_thread,
                args=(i,),
                daemon=True
            )
            worker.start()
            self.workers.append(worker)
            
    def stop(self):
        """
        停止工作线程
        """
        self.running = False
        
        # 发送停止信号
        for _ in range(self.num_workers):
            self.input_queue.put(None)
            
        # 等待线程结束
        for worker in self.workers:
            worker.join()
            
    def _worker_thread(self, worker_id):
        """
        工作线程函数
        """
        while self.running:
            try:
                # 从队列获取任务
                task = self.input_queue.get(timeout=1)
                
                if task is None:  # 停止信号
                    break
                    
                # 处理任务
                result = self._process_task(task, worker_id)
                
                # 将结果放入输出队列
                self.output_queue.put(result)
                
                # 标记任务完成
                self.input_queue.task_done()
                
            except queue.Empty:
                continue
            except Exception as e:
                print(f"Worker {worker_id} error: {e}")
                
    def _process_task(self, task, worker_id):
        """
        处理单个任务
        """
        data = task['data']
        task_type = task['type']
        
        if task_type == 'power_analysis':
            return self._analyze_power_data(data, worker_id)
        elif task_type == 'efficiency_calculation':
            return self._calculate_efficiency(data, worker_id)
        elif task_type == 'anomaly_detection':
            return self._detect_anomalies(data, worker_id)
        else:
            return {'error': f'Unknown task type: {task_type}'}
            
    def _analyze_power_data(self, data, worker_id):
        """
        分析功率数据
        """
        # 模拟复杂计算
        time.sleep(0.1)
        
        power_values = [point['power'] for point in data]
        
        return {
            'worker_id': worker_id,
            'task_type': 'power_analysis',
            'mean_power': sum(power_values) / len(power_values),
            'max_power': max(power_values),
            'min_power': min(power_values),
            'data_points': len(power_values)
        }
        
    def _calculate_efficiency(self, data, worker_id):
        """
        计算系统效率
        """
        # 模拟复杂计算
        time.sleep(0.05)
        
        total_input = sum(point['solar_irradiance'] for point in data)
        total_output = sum(point['power'] for point in data)
        
        efficiency = (total_output / total_input) * 100 if total_input > 0 else 0
        
        return {
            'worker_id': worker_id,
            'task_type': 'efficiency_calculation',
            'efficiency': efficiency,
            'total_input': total_input,
            'total_output': total_output
        }
        
    def _detect_anomalies(self, data, worker_id):
        """
        检测异常数据
        """
        # 模拟异常检测算法
        time.sleep(0.08)
        
        power_values = [point['power'] for point in data]
        mean_power = sum(power_values) / len(power_values)
        
        anomalies = []
        for i, power in enumerate(power_values):
            if abs(power - mean_power) > mean_power * 0.5:  # 50%偏差阈值
                anomalies.append({
                    'index': i,
                    'power': power,
                    'deviation': abs(power - mean_power)
                })
                
        return {
            'worker_id': worker_id,
            'task_type': 'anomaly_detection',
            'anomalies_count': len(anomalies),
            'anomalies': anomalies,
            'mean_power': mean_power
        }
        
    def submit_task(self, task):
        """
        提交任务
        """
        self.input_queue.put(task)
        
    def get_result(self, timeout=None):
        """
        获取处理结果
        """
        try:
            return self.output_queue.get(timeout=timeout)
        except queue.Empty:
            return None

# 使用示例
processor = ConcurrentDataProcessor(num_workers=4)
processor.start()

# 提交任务
tasks = [
    {'type': 'power_analysis', 'data': generate_sample_data(100)},
    {'type': 'efficiency_calculation', 'data': generate_sample_data(100)},
    {'type': 'anomaly_detection', 'data': generate_sample_data(100)}
]

for task in tasks:
    processor.submit_task(task)

# 获取结果
results = []
for _ in range(len(tasks)):
    result = processor.get_result(timeout=5)
    if result:
        results.append(result)
        
processor.stop()

# 打印结果
for result in results:
    print(f"Task {result['task_type']} completed by worker {result['worker_id']}")
```

### 异步I/O优化

```python
import asyncio
import aiohttp
import aiofiles
import time
from typing import List, Dict

class AsyncDataCollector:
    """
    异步数据收集器
    """
    def __init__(self, max_concurrent=10):
        self.max_concurrent = max_concurrent
        self.semaphore = asyncio.Semaphore(max_concurrent)
        
    async def collect_sensor_data(self, sensor_urls: List[str]) -> List[Dict]:
        """
        异步收集多个传感器的数据
        """
        tasks = []
        
        for url in sensor_urls:
            task = asyncio.create_task(self._fetch_sensor_data(url))
            tasks.append(task)
            
        # 等待所有任务完成
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # 过滤异常结果
        valid_results = []
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                print(f"Error fetching data from {sensor_urls[i]}: {result}")
            else:
                valid_results.append(result)
                
        return valid_results
        
    async def _fetch_sensor_data(self, url: str) -> Dict:
        """
        从单个传感器获取数据
        """
        async with self.semaphore:  # 限制并发数
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, timeout=5) as response:
                        if response.status == 200:
                            data = await response.json()
                            return {
                                'url': url,
                                'data': data,
                                'timestamp': time.time(),
                                'status': 'success'
                            }
                        else:
                            return {
                                'url': url,
                                'error': f'HTTP {response.status}',
                                'timestamp': time.time(),
                                'status': 'error'
                            }
            except Exception as e:
                return {
                    'url': url,
                    'error': str(e),
                    'timestamp': time.time(),
                    'status': 'error'
                }
                
    async def save_data_batch(self, data_batch: List[Dict], 
                             filename: str) -> bool:
        """
        异步批量保存数据
        """
        try:
            async with aiofiles.open(filename, 'w') as f:
                import json
                await f.write(json.dumps(data_batch, indent=2))
            return True
        except Exception as e:
            print(f"Error saving data: {e}")
            return False
            
    async def process_data_pipeline(self, sensor_urls: List[str], 
                                   output_file: str) -> Dict:
        """
        完整的数据处理管道
        """
        start_time = time.time()
        
        # 收集数据
        print(f"Collecting data from {len(sensor_urls)} sensors...")
        sensor_data = await self.collect_sensor_data(sensor_urls)
        
        # 处理数据
        print("Processing collected data...")
        processed_data = await self._process_collected_data(sensor_data)
        
        # 保存数据
        print(f"Saving data to {output_file}...")
        save_success = await self.save_data_batch(processed_data, output_file)
        
        end_time = time.time()
        
        return {
            'total_sensors': len(sensor_urls),
            'successful_collections': len([d for d in sensor_data if d.get('status') == 'success']),
            'processing_time': end_time - start_time,
            'save_success': save_success,
            'output_file': output_file
        }
        
    async def _process_collected_data(self, sensor_data: List[Dict]) -> List[Dict]:
        """
        处理收集到的数据
        """
        processed_data = []
        
        for sensor_result in sensor_data:
            if sensor_result.get('status') == 'success':
                data = sensor_result['data']
                
                # 数据处理逻辑
                processed_item = {
                    'sensor_url': sensor_result['url'],
                    'timestamp': sensor_result['timestamp'],
                    'power': data.get('power', 0),
                    'efficiency': self._calculate_efficiency(data),
                    'status': 'processed'
                }
                
                processed_data.append(processed_item)
                
        return processed_data
        
    def _calculate_efficiency(self, data: Dict) -> float:
        """
        计算效率
        """
        power = data.get('power', 0)
        irradiance = data.get('solar_irradiance', 1)
        
        return (power / irradiance) * 100 if irradiance > 0 else 0

# 使用示例
async def main():
    collector = AsyncDataCollector(max_concurrent=5)
    
    # 模拟传感器URL列表
    sensor_urls = [
        f"http://sensor{i}.example.com/data" 
        for i in range(1, 21)  # 20个传感器
    ]
    
    # 执行数据收集管道
    result = await collector.process_data_pipeline(
        sensor_urls, 
        'collected_data.json'
    )
    
    print(f"Pipeline completed:")
    print(f"- Total sensors: {result['total_sensors']}")
    print(f"- Successful collections: {result['successful_collections']}")
    print(f"- Processing time: {result['processing_time']:.2f} seconds")
    print(f"- Save success: {result['save_success']}")

# 运行异步程序
if __name__ == "__main__":
    asyncio.run(main())
```

## 📊 缓存策略优化

### 多级缓存系统

```python
import time
import threading
from typing import Any, Optional, Dict
from collections import OrderedDict
import pickle
import redis

class MultiLevelCache:
    """
    多级缓存系统：内存缓存 -> Redis缓存 -> 数据库
    """
    def __init__(self, 
                 memory_size=1000,
                 redis_host='localhost',
                 redis_port=6379,
                 redis_db=0):
        # L1缓存：内存缓存（最快）
        self.memory_cache = LRUCache(memory_size)
        
        # L2缓存：Redis缓存（中等速度）
        try:
            self.redis_client = redis.Redis(
                host=redis_host, 
                port=redis_port, 
                db=redis_db,
                decode_responses=False
            )
            self.redis_available = True
        except:
            self.redis_client = None
            self.redis_available = False
            
        # 缓存统计
        self.stats = {
            'l1_hits': 0,
            'l1_misses': 0,
            'l2_hits': 0,
            'l2_misses': 0,
            'total_requests': 0
        }
        
        self.lock = threading.RLock()
        
    def get(self, key: str) -> Optional[Any]:
        """
        获取缓存数据
        """
        with self.lock:
            self.stats['total_requests'] += 1
            
            # L1缓存查找
            value = self.memory_cache.get(key)
            if value is not None:
                self.stats['l1_hits'] += 1
                return value
                
            self.stats['l1_misses'] += 1
            
            # L2缓存查找
            if self.redis_available:
                try:
                    redis_value = self.redis_client.get(key)
                    if redis_value is not None:
                        self.stats['l2_hits'] += 1
                        # 反序列化数据
                        value = pickle.loads(redis_value)
                        # 回填到L1缓存
                        self.memory_cache.put(key, value)
                        return value
                except Exception as e:
                    print(f"Redis error: {e}")
                    
            self.stats['l2_misses'] += 1
            return None
            
    def put(self, key: str, value: Any, ttl: int = 3600):
        """
        存储数据到缓存
        """
        with self.lock:
            # 存储到L1缓存
            self.memory_cache.put(key, value, ttl)
            
            # 存储到L2缓存
            if self.redis_available:
                try:
                    serialized_value = pickle.dumps(value)
                    self.redis_client.setex(key, ttl, serialized_value)
                except Exception as e:
                    print(f"Redis error: {e}")
                    
    def delete(self, key: str):
        """
        删除缓存数据
        """
        with self.lock:
            # 从L1缓存删除
            self.memory_cache.delete(key)
            
            # 从L2缓存删除
            if self.redis_available:
                try:
                    self.redis_client.delete(key)
                except Exception as e:
                    print(f"Redis error: {e}")
                    
    def get_stats(self) -> Dict:
        """
        获取缓存统计信息
        """
        with self.lock:
            total_requests = self.stats['total_requests']
            if total_requests == 0:
                return self.stats
                
            l1_hit_rate = (self.stats['l1_hits'] / total_requests) * 100
            l2_hit_rate = (self.stats['l2_hits'] / total_requests) * 100
            overall_hit_rate = ((self.stats['l1_hits'] + self.stats['l2_hits']) / total_requests) * 100
            
            return {
                **self.stats,
                'l1_hit_rate': l1_hit_rate,
                'l2_hit_rate': l2_hit_rate,
                'overall_hit_rate': overall_hit_rate
            }

class LRUCache:
    """
    LRU（最近最少使用）缓存实现
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()
        self.expiry_times = {}
        
    def get(self, key: str) -> Optional[Any]:
        """
        获取缓存值
        """
        if key not in self.cache:
            return None
            
        # 检查是否过期
        if key in self.expiry_times:
            if time.time() > self.expiry_times[key]:
                self.delete(key)
                return None
                
        # 移动到末尾（标记为最近使用）
        self.cache.move_to_end(key)
        return self.cache[key]
        
    def put(self, key: str, value: Any, ttl: int = 3600):
        """
        存储缓存值
        """
        if key in self.cache:
            # 更新现有值
            self.cache[key] = value
            self.cache.move_to_end(key)
        else:
            # 添加新值
            if len(self.cache) >= self.capacity:
                # 删除最久未使用的项
                oldest_key = next(iter(self.cache))
                self.delete(oldest_key)
                
            self.cache[key] = value
            
        # 设置过期时间
        if ttl > 0:
            self.expiry_times[key] = time.time() + ttl
            
    def delete(self, key: str):
        """
        删除缓存项
        """
        if key in self.cache:
            del self.cache[key]
        if key in self.expiry_times:
            del self.expiry_times[key]
            
    def clear_expired(self):
        """
        清理过期项
        """
        current_time = time.time()
        expired_keys = [
            key for key, expiry_time in self.expiry_times.items()
            if current_time > expiry_time
        ]
        
        for key in expired_keys:
            self.delete(key)

# 缓存装饰器
def cached(cache_instance, ttl=3600, key_func=None):
    """
    缓存装饰器
    """
    def decorator(func):
        def wrapper(*args, **kwargs):
            # 生成缓存键
            if key_func:
                cache_key = key_func(*args, **kwargs)
            else:
                cache_key = f"{func.__name__}:{hash(str(args) + str(kwargs))}"
                
            # 尝试从缓存获取
            cached_result = cache_instance.get(cache_key)
            if cached_result is not None:
                return cached_result
                
            # 执行函数并缓存结果
            result = func(*args, **kwargs)
            cache_instance.put(cache_key, result, ttl)
            
            return result
        return wrapper
    return decorator

# 使用示例
cache = MultiLevelCache(memory_size=500)

@cached(cache, ttl=1800, key_func=lambda sensor_id, date: f"power_analysis:{sensor_id}:{date}")
def analyze_sensor_power(sensor_id: str, date: str) -> Dict:
    """
    分析传感器功率数据（模拟耗时操作）
    """
    print(f"Analyzing power data for sensor {sensor_id} on {date}...")
    time.sleep(2)  # 模拟复杂计算
    
    return {
        'sensor_id': sensor_id,
        'date': date,
        'avg_power': 1250.5,
        'max_power': 1800.0,
        'min_power': 800.0,
        'efficiency': 85.2
    }

# 测试缓存效果
start_time = time.time()
result1 = analyze_sensor_power("SENSOR_001", "2024-01-15")  # 第一次调用，执行函数
print(f"First call took: {time.time() - start_time:.2f} seconds")

start_time = time.time()
result2 = analyze_sensor_power("SENSOR_001", "2024-01-15")  # 第二次调用，从缓存获取
print(f"Second call took: {time.time() - start_time:.2f} seconds")

# 打印缓存统计
print("Cache stats:", cache.get_stats())
```

## 🔍 性能监控和分析

### 性能分析器

```python
import cProfile
import pstats
import io
import time
import psutil
import threading
from functools import wraps
from typing import Dict, List, Callable

class PerformanceProfiler:
    """
    性能分析器
    """
    def __init__(self):
        self.profiles = {}
        self.system_stats = []
        self.monitoring = False
        self.monitor_thread = None
        
    def profile_function(self, func_name: str = None):
        """
        函数性能分析装饰器
        """
        def decorator(func: Callable):
            @wraps(func)
            def wrapper(*args, **kwargs):
                name = func_name or func.__name__
                
                # 创建性能分析器
                profiler = cProfile.Profile()
                
                # 开始分析
                profiler.enable()
                start_time = time.time()
                
                try:
                    result = func(*args, **kwargs)
                finally:
                    # 停止分析
                    profiler.disable()
                    end_time = time.time()
                    
                    # 保存分析结果
                    self.profiles[name] = {
                        'profiler': profiler,
                        'execution_time': end_time - start_time,
                        'timestamp': time.time()
                    }
                    
                return result
            return wrapper
        return decorator
        
    def get_function_stats(self, func_name: str) -> str:
        """
        获取函数性能统计
        """
        if func_name not in self.profiles:
            return f"No profile data for function: {func_name}"
            
        profile_data = self.profiles[func_name]
        profiler = profile_data['profiler']
        
        # 创建字符串缓冲区
        s = io.StringIO()
        
        # 生成统计报告
        stats = pstats.Stats(profiler, stream=s)
        stats.sort_stats('cumulative')
        stats.print_stats(20)  # 显示前20个函数
        
        # 添加执行时间信息
        result = f"Function: {func_name}\n"
        result += f"Total execution time: {profile_data['execution_time']:.4f} seconds\n"
        result += f"Timestamp: {time.ctime(profile_data['timestamp'])}\n"
        result += "\n" + s.getvalue()
        
        return result
        
    def start_system_monitoring(self, interval: float = 1.0):
        """
        开始系统监控
        """
        if self.monitoring:
            return
            
        self.monitoring = True
        self.monitor_thread = threading.Thread(
            target=self._monitor_system,
            args=(interval,),
            daemon=True
        )
        self.monitor_thread.start()
        
    def stop_system_monitoring(self):
        """
        停止系统监控
        """
        self.monitoring = False
        if self.monitor_thread:
            self.monitor_thread.join()
            
    def _monitor_system(self, interval: float):
        """
        系统监控线程
        """
        while self.monitoring:
            try:
                # 获取系统信息
                cpu_percent = psutil.cpu_percent(interval=0.1)
                memory = psutil.virtual_memory()
                disk = psutil.disk_usage('/')
                
                # 获取网络信息
                network = psutil.net_io_counters()
                
                # 记录统计信息
                stats = {
                    'timestamp': time.time(),
                    'cpu_percent': cpu_percent,
                    'memory_percent': memory.percent,
                    'memory_used_gb': memory.used / (1024**3),
                    'memory_total_gb': memory.total / (1024**3),
                    'disk_percent': (disk.used / disk.total) * 100,
                    'disk_used_gb': disk.used / (1024**3),
                    'disk_total_gb': disk.total / (1024**3),
                    'network_bytes_sent': network.bytes_sent,
                    'network_bytes_recv': network.bytes_recv
                }
                
                self.system_stats.append(stats)
                
                # 保持最近1000条记录
                if len(self.system_stats) > 1000:
                    self.system_stats.pop(0)
                    
            except Exception as e:
                print(f"System monitoring error: {e}")
                
            time.sleep(interval)
            
    def get_system_stats_summary(self) -> Dict:
        """
        获取系统统计摘要
        """
        if not self.system_stats:
            return {"error": "No system stats available"}
            
        # 计算平均值
        cpu_values = [s['cpu_percent'] for s in self.system_stats]
        memory_values = [s['memory_percent'] for s in self.system_stats]
        
        return {
            'monitoring_duration': len(self.system_stats),
            'cpu_avg': sum(cpu_values) / len(cpu_values),
            'cpu_max': max(cpu_values),
            'cpu_min': min(cpu_values),
            'memory_avg': sum(memory_values) / len(memory_values),
            'memory_max': max(memory_values),
            'memory_min': min(memory_values),
            'latest_stats': self.system_stats[-1] if self.system_stats else None
        }

# 使用示例
profiler = PerformanceProfiler()

# 开始系统监控
profiler.start_system_monitoring(interval=0.5)

@profiler.profile_function("solar_power_calculation")
def calculate_solar_power(irradiance_data: List[float], 
                         panel_efficiency: float) -> List[float]:
    """
    计算太阳能功率（模拟复杂计算）
    """
    power_output = []
    
    for irradiance in irradiance_data:
        # 模拟复杂的功率计算
        base_power = irradiance * panel_efficiency
        
        # 添加温度修正（模拟）
        temperature_factor = 0.95  # 假设温度影响
        corrected_power = base_power * temperature_factor
        
        # 添加阴影影响计算（模拟）
        shadow_factor = 0.98
        final_power = corrected_power * shadow_factor
        
        power_output.append(final_power)
        
        # 模拟计算延迟
        time.sleep(0.001)
        
    return power_output

@profiler.profile_function("data_analysis")
def analyze_power_data(power_data: List[float]) -> Dict:
    """
    分析功率数据
    """
    if not power_data:
        return {}
        
    # 基本统计
    total_power = sum(power_data)
    avg_power = total_power / len(power_data)
    max_power = max(power_data)
    min_power = min(power_data)
    
    # 计算标准差
    variance = sum((x - avg_power) ** 2 for x in power_data) / len(power_data)
    std_dev = variance ** 0.5
    
    # 查找峰值
    peaks = []
    for i in range(1, len(power_data) - 1):
        if (power_data[i] > power_data[i-1] and 
            power_data[i] > power_data[i+1] and 
            power_data[i] > avg_power * 1.2):
            peaks.append(i)
            
    return {
        'total_power': total_power,
        'avg_power': avg_power,
        'max_power': max_power,
        'min_power': min_power,
        'std_dev': std_dev,
        'peak_count': len(peaks),
        'peak_indices': peaks
    }

# 测试性能分析
print("Running performance tests...")

# 生成测试数据
test_irradiance = [800 + i * 10 for i in range(100)]

# 执行被分析的函数
power_results = calculate_solar_power(test_irradiance, 0.2)
analysis_results = analyze_power_data(power_results)

print(f"Analysis results: {analysis_results}")

# 等待一段时间收集系统统计
time.sleep(5)

# 停止系统监控
profiler.stop_system_monitoring()

# 打印性能分析结果
print("\n" + "="*50)
print("PERFORMANCE ANALYSIS RESULTS")
print("="*50)

print(profiler.get_function_stats("solar_power_calculation"))
print("\n" + "-"*50)
print(profiler.get_function_stats("data_analysis"))

# 打印系统统计摘要
print("\n" + "-"*50)
print("SYSTEM STATS SUMMARY")
print("-"*50)
system_summary = profiler.get_system_stats_summary()
for key, value in system_summary.items():
    if isinstance(value, float):
        print(f"{key}: {value:.2f}")
    else:
        print(f"{key}: {value}")
```

## 🎯 实际应用案例

### 新能源数据处理系统优化

```python
class OptimizedEnergyDataSystem:
    """
    优化的新能源数据处理系统
    """
    def __init__(self):
        # 初始化各种优化组件
        self.cache = MultiLevelCache(memory_size=1000)
        self.profiler = PerformanceProfiler()
        self.data_processor = ConcurrentDataProcessor(num_workers=8)
        self.memory_store = MemoryMappedDataStore('energy_data.dat')
        
        # 启动系统监控
        self.profiler.start_system_monitoring()
        self.data_processor.start()
        
    @profiler.profile_function("batch_process_sensors")
    def process_sensor_batch(self, sensor_data_batch: List[Dict]) -> Dict:
        """
        批量处理传感器数据
        """
        results = {
            'processed_count': 0,
            'total_power': 0,
            'avg_efficiency': 0,
            'anomalies': []
        }
        
        # 并发处理数据
        tasks = []
        for i, sensor_data in enumerate(sensor_data_batch):
            task = {
                'type': 'power_analysis',
                'data': sensor_data,
                'batch_index': i
            }
            self.data_processor.submit_task(task)
            tasks.append(task)
            
        # 收集结果
        processed_results = []
        for _ in tasks:
            result = self.data_processor.get_result(timeout=10)
            if result:
                processed_results.append(result)
                
        # 汇总结果
        results['processed_count'] = len(processed_results)
        if processed_results:
            total_power = sum(r.get('mean_power', 0) for r in processed_results)
            results['total_power'] = total_power
            results['avg_power'] = total_power / len(processed_results)
            
        return results
        
    def cleanup(self):
        """
        清理资源
        """
        self.profiler.stop_system_monitoring()
        self.data_processor.stop()
        self.memory_store.close()

# 性能测试
def run_performance_test():
    system = OptimizedEnergyDataSystem()
    
    try:
        # 生成测试数据
        test_data = []
        for i in range(100):
            sensor_batch = []
            for j in range(50):  # 每批50个传感器
                sensor_batch.append({
                    'sensor_id': f'SENSOR_{i}_{j}',
                    'power': 1000 + j * 10,
                    'efficiency': 0.8 + j * 0.001,
                    'temperature': 25 + j * 0.1
                })
            test_data.append(sensor_batch)
            
        # 执行性能测试
        start_time = time.time()
        
        for batch in test_data:
            result = system.process_sensor_batch(batch)
            print(f"Processed batch: {result['processed_count']} sensors, "
                  f"Total power: {result['total_power']:.2f}W")
            
        end_time = time.time()
        
        print(f"\nTotal processing time: {end_time - start_time:.2f} seconds")
        print(f"Processed {len(test_data)} batches with {len(test_data[0])} sensors each")
        
        # 打印性能统计
        print("\nPerformance Analysis:")
        print(system.profiler.get_function_stats("batch_process_sensors"))
        
        print("\nSystem Stats:")
        stats = system.profiler.get_system_stats_summary()
        for key, value in stats.items():
            if isinstance(value, (int, float)):
                print(f"{key}: {value:.2f}")
                
    finally:
        system.cleanup()

if __name__ == "__main__":
    run_performance_test()
```

## 📚 学习资源

### 推荐书籍
- 《高性能Python》
- 《Python性能分析与优化》
- 《系统性能调优》
- 《并发编程实战》

### 在线资源
- [Python性能优化指南](https://docs.python.org/3/howto/perf_profiling.html)
- [系统性能监控工具](https://github.com/giampaolo/psutil)
- [Redis缓存最佳实践](https://redis.io/documentation)

## ✅ 学习检查清单

完成以下任务，验证您的性能优化技能：

- [ ] 实现算法时间复杂度优化
- [ ] 应用内存管理优化技术
- [ ] 使用并发和异步编程
- [ ] 实现多级缓存系统
- [ ] 进行性能分析和监控
- [ ] 优化I/O操作
- [ ] 实现流式数据处理
- [ ] 应用系统级优化技术

## 🎉 下一步学习

完成系统性能优化后，您可以继续学习：

1. [分布式系统设计](/docs/tutorials/advanced/distributed-systems)
2. [微服务架构](/docs/tutorials/advanced/microservices)
3. [云原生开发](/docs/tutorials/advanced/cloud-native)
4. [DevOps实践](/docs/tutorials/advanced/devops)

---

**需要帮助？** [查看常见问题](/docs/resources/faq) 或 [加入技术讨论](/join)
